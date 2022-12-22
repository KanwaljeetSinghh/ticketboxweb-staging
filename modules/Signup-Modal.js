import { useState, useRef } from "react";
import Modal from "./Modal";
import styles from "../modules/css/modal.module.css";
import {useRouter} from 'next/router';
import useFirebaseAuth from "../auth/useFirebaseAuth";
import Google from "../icons/google";
import Apple from "../icons/apple";
import FacebookDark from "../icons/facebook-dark";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Loader from "./Loader";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
function SignupModal(props){
    const {createUserWithEmailAndPassword,formatAuthUser, signOut,signInWithGoogle,signInWithFacebook,signInWithApple} = useFirebaseAuth(); 
    const [email,setEmail] = useState('');
    const [fullName,setfullname] = useState('')
    const [referalCode,setReferalCode] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [passMatch, setPassMatch] = useState(false);
    const [errorName,setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorRePass, setErrorRePass] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [loading,setLoading] = useState(false)
    const [phoneCodeValue, setPhoneCodeValue] = useState('')
    const [phone, setPhone] = useState('');
    const [countryCode,setCountryCode] = useState('')
    const [errorBox,setErrorBox] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const policy = useRef(null);
    const router = useRouter();
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const fullNameHandler = (e) => {
        setfullname(e.target.value);
        setErrorName(false)
    }
    const emailHandler =(e) =>{
        setEmail(e.target.value);
        setErrorEmail(false)
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
        setErrorPass(false)
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const repasswordHandler = (e) =>{
        setRePassword(e.target.value);
        setPassMatch(false)
        setErrorRePass(false)
    }
    const viewRePassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const referalCodeHandler = (e) =>{
        setReferalCode(e.target.value)
    }
    const phoneHandler = (e) =>{
        setPhone(e.target.value);
    }
    const checkPasswordHandler = (e) => {
        if(password === repassword ){
            setPassMatch(false);
        }else{
            setPassMatch(true);
        }
    }
    const emailCheckHandler = () =>{
        if(reg.test(email)){
            setErrorEmail(false);
        }else{
            setErrorEmail(true);
        }
    }
    const policyAcceptedHandler = () =>{
        setPolicyAccepted(prev => !prev);
    }
    const validator = () =>{
        let res = true
        if(fullName === ''){
            setErrorName(true);
            res = false;
        }else{
            setErrorName(false);
        }
        if(email === ''){
            setErrorEmail(true);
            res = false;
        }else{
            setErrorEmail(false);
        }
        if(password === ''){
            setErrorPass(true);
            res = false;
        }else{
            setErrorPass(false);
        }
        if(repassword === ''){
            setErrorRePass(true);
            res = false;
        }else{
            setErrorRePass(false);
        }
        if(password === repassword){
            if((password != "" && repassword != "")){
                setPassMatch(false);
                res = true;
            }
            else{
                res = false
            }
        }else{
            if((password != "" && repassword != "")){
                setPassMatch(true);
            }
            res = false;
        }
        return res;
    }
    const privacyHandler = () => {
        window.open('/policy',"_blank")
    }
    const termsHandler = () => {
        window.open('/terms',"_blank")
    }
    const submitHandler = (e) =>{
        setErrorBox(false)
        setErrorMsg('')
        const result = validator();
        if(result){
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "email": email,
                "type": "user"
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/verifyBeforeLogin", requestOptions)
            .then(response => response.json())
            .then((result)=>{
                if(result.status){
                    createUserWithEmailAndPassword(email, password)
                    .then(authUser =>{
                        authUser.user.sendEmailVerification();
                        var data = formatAuthUser(authUser.user);
                        signOut().then(()=>{});
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        var raw = JSON.stringify({
                            "displayName":fullName,
                            "email":data.email,
                            "uid":data.uid,
                            "photoUrl":data.photo,
                            "phone":phone,
                            "inviteReferralCode":referalCode,
                            "countryCode":countryCode
                        });
                        var requestOptions = {
                            method: 'POST',
                            body: raw,
                            headers: myHeaders,
                            redirect: 'follow'
                        };
                        fetch(process.env.URL+"/user/register", requestOptions)
                        .then(response => {
                            if(response.ok){
                                return response.json();
                            }
                            else{
                                throw new Error(response);
                            }
                        })
                        .then(result => {
                            if(result.status){
                                props.registerFormHandler(data.email);
                                setLoading(false)
                            }
                            else{
                                props.handler();
                                setLoading(false)
                                toast.info("Account created but few details have not been saved. Please edit your profile after login",{
                                    toastId:"register-1"
                                })
                            }
                        })
                        .catch(error => {
                            setLoading(false)
                            setErrorBox(true)
                            setErrorMsg(error)
                        });             
                    })
                    .catch(error =>{
                        setLoading(false)
                        setErrorBox(true)
                        if(error.code == "auth/email-already-in-use"){
                            toast.error("The email is already exists.",{
                                toastId:"createUser-1",
                            })
                            setErrorMsg("The email is already exists.");
                        }
                        else if(error.code == "auth/weak-password"){
                            toast.error("Password should be at least 6 characters",{
                                toastId:"createUser-2",
                            })
                            setErrorMsg("Password should be at least 6 characters");
                        }
                        else{
                            toast.error(error.code,{
                                toastId:"createUser-3",
                            })
                            setErrorMsg(error.message);
                        }
                    })
                }
                else{
                    setLoading(false)
                    setErrorBox(true)
                    setErrorMsg("The email address has already used in host panel.")
                    toast.error("The email address has already used in host panel",{
                        toastId:"webNotLoginverify-1",
                    })
                }
            })
            .catch((error)=>{
                setLoading(false)
                toast.error("We are unable to verify your email. Please refresh and try again later",{
                    toastId:"webLoginverify-1",
                })
            })
        }
        e.preventDefault();
    }
    const signInWithGoogleHandler = () =>{
        signInWithGoogle()
        .then(authUser => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "email": authUser.user.email,
                "type": "user"
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/verifyBeforeLogin", requestOptions)
            .then(response => response.json())
            .then((result)=>{
                if(result.status){
                    if(authUser){
                        router.push("/");
                    } 
                    setLoading(false)
                    props.registerFormHandler();
                }
                else{
                    setLoading(false)
                    setErrorBox(true)
                    signOut().then(()=>{})
                    setErrorMsg("The email address has already used in host panel.")
                    toast.error("The email address has already used in host panel",{
                        toastId:"webGoogleNotLoginverify-1",
                    })
                }
            })  
            .catch((error)=>{
                setLoading(false)
                toast.error("We are unable to verify your email. Please refresh and try again later",{
                    toastId:"webGoogleLoginverify-1",
                })
            })
        })
        .catch(error=>{
            setLoading(false)
        })
    }
    const signInWithFacebookHandler = () =>{
        signInWithFacebook()
        .then(authUser => {
            var data = formatAuthUser(authUser.user);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "displayName":data.name? data.name:"User",
                "email":data.email,
                "uid":data.uid,
                "photoUrl":data.photo,
                "phone":data.phone,
                "inviteReferralCode":referal
            });
            var requestOptions = {
                method: 'POST',
                body: raw,
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/register", requestOptions)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error(response);
                }
            })
            .then(result => {
                if(result.status){
                    setCookiesLog(data);
                    if(authUser){
                        setTimeout(()=>{
                            router.push("/");
                        },1500)
                    } 
                    props.registerFormHandler();
                }
                else{
                    signOut().then(()=>{})
                    toast.error(result.msg,{
                        toastId:"se-4"
                    })
                }
                
            })
            .catch(error => {
                signOut().then(()=>{})
                toast.error(error,{
                toastId:"se-5"
            })});      
        })
        .catch(error=>{
            setErrorBox(true)
            setErrorMsg(error.message);
            setLoading(false)
        })
    }
    const signInWithAppleHandler = () =>{
        signInWithApple()
        .then(authUser => {
            var data = formatAuthUser(authUser.user);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "displayName":data.name? data.name:"User",
                "email":data.email,
                "uid":data.uid,
                "photoUrl":data.photo,
                "phone":data.phone,
                "inviteReferralCode":referal
            });
            var requestOptions = {
                method: 'POST',
                body: raw,
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/register", requestOptions)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error(response);
                }
            })
            .then(result => {
                if(result.status){
                    setCookiesLog(data);
                    if(authUser){
                        setTimeout(()=>{
                            router.push("/");
                        },1500)
                    } 
                    props.registerFormHandler();
                }
                else{
                    signOut().then(()=>{})
                    toast.error(result.msg,{
                        toastId:"se-4"
                    })
                }
            })
            .catch(error => {
                signOut().then(()=>{})
                toast.error(error,{
                toastId:"se-5"
            })});      
        })
        .catch(error=>{
            setErrorBox(true)
            setErrorMsg(error.message);
            setLoading(false)
        })
    }
    return (
        <>
        <Modal modalClass="modal-sign" cross="yes" handler={props.handler}>
            <form onSubmit={submitHandler}>
                <div className={`d-flex d-flex-column gap-1 ${styles["centered"]}`}>  
                    <h4 className="f-600 l-23 m-0">Create your Account</h4>
                    <span className="font-14 l-20 f-500">Please register to continue to your account</span>
                    <label >Full Name</label>
                    <input type="text" className={`${errorName && styles["error"]}`}  placeholder="Enter your name" value={fullName} onChange={fullNameHandler} />
                    {errorName && <span className={`font-10 f-700 text-danger `}>Please enter name.</span>}
                    <label >Email</label>
                    <input type="email" className={`${errorEmail && styles["error"]}`}  placeholder="Enter your email" value={email} onChange={emailHandler} onBlur={emailCheckHandler} />
                    {errorEmail && <span className={`font-10 f-700 text-danger `}>Please enter valid email.</span>}

                    <label >Password</label>
                    <div className={`${styles["password"]} ${errorPass && styles["error"]} d-flex d-justify-space-between d-align-center`}>
                        <input type="password" placeholder="At least 6 characters" value={password} onChange={passwordHandler}  />
                        <input type="text" placeholder="Re-enter password" value={password} onChange={passwordHandler} />
                        <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewPassword}>
                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5">
                                    <path d="M2 5.73916C4 1.84017 11 -2.15983 16 5.73916C11 12.3402 4 9.84017 2 5.73916Z" fill="black" fillOpacity="0.5"/>
                                    <path d="M1.55512 5.51095L1.44095 5.73351L1.55059 5.95833C2.62808 8.16772 5.02898 9.91713 7.81589 10.2489C10.6346 10.5845 13.8024 9.46856 16.3986 6.04106L16.6079 5.76469L16.4225 5.47174C15.1343 3.43668 13.6946 2.13266 12.2027 1.40865C10.7076 0.683098 9.19099 0.555263 7.78144 0.823748C4.98761 1.35591 2.61691 3.44099 1.55512 5.51095Z" stroke="black" strokeOpacity="0.5"/>
                                    <rect x="6.5" y="3" width="5" height="5" rx="2.5" fill="#808080" stroke="white" strokeWidth="1.5"/>
                                </g>
                            </svg>
                        </span>
                    </div>
                    {errorPass && <span className={`font-10 f-700 text-danger `}>Please enter password.</span>}

                    <label >Re-enter Password</label>
                    <div className={`${styles["password"]} ${passMatch && styles["error"]} ${errorRePass && styles["error"]} d-flex d-justify-space-between d-align-center`}>
                        <input type="password" placeholder="Enter your password" value={repassword} onChange={repasswordHandler}/>
                        <input type="text" placeholder="Enter your password" value={repassword} onChange={repasswordHandler} />
                        <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewRePassword}>
                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5">
                                    <path d="M2 5.73916C4 1.84017 11 -2.15983 16 5.73916C11 12.3402 4 9.84017 2 5.73916Z" fill="black" fillOpacity="0.5"/>
                                    <path d="M1.55512 5.51095L1.44095 5.73351L1.55059 5.95833C2.62808 8.16772 5.02898 9.91713 7.81589 10.2489C10.6346 10.5845 13.8024 9.46856 16.3986 6.04106L16.6079 5.76469L16.4225 5.47174C15.1343 3.43668 13.6946 2.13266 12.2027 1.40865C10.7076 0.683098 9.19099 0.555263 7.78144 0.823748C4.98761 1.35591 2.61691 3.44099 1.55512 5.51095Z" stroke="black" strokeOpacity="0.5"/>
                                    <rect x="6.5" y="3" width="5" height="5" rx="2.5" fill="#808080" stroke="white" strokeWidth="1.5"/>
                                </g>
                            </svg>
                        </span>
                    </div>
                    {passMatch && <span className={`font-10 f-700 text-danger `}>Password doesn't match.</span>}
                    {errorRePass && <span className={`font-10 f-700 text-danger `}>Please re-enter password.</span>}
                    <label >Referral Code (Optional)</label>
                    <input type="text"  placeholder="Referral Code here" value={referalCode} onChange={referalCodeHandler} />
                    <label >Contact Number (Optional)</label>
                    <PhoneInput
                            country={"us"}
                            value={phoneCodeValue}
                            placeholder="Enter phone"
                            copyNumbersOnly={true}
                            label={false}
                            onChange={(value, data) => {
                                setPhoneCodeValue(value)
                                setCountryCode(data.dialCode);
                                setPhone(value.slice(data.dialCode.length))
                            }}
                            inputStyle={{
                                backgroundColor:"#EEE",
                                width:"100%",
                                border:"none",
                                height:"40px",
                                borderRadius:" 4px"
                            }}
                        />
    
                    <div className={`mt-2 d-flex d-align-center cursor-pointer user-select-none l-15 ${styles["checkbox-wrapper"]}`}>
                        {policyAccepted && <input type="checkbox" id="policy" ref={policy} checked  onClick={policyAcceptedHandler}></input>}
                        {!policyAccepted && <input type='checkbox' id="policy" ref={policy}  onClick={policyAcceptedHandler} required></input>}
                        
                        <label htmlFor="policy" className="font-12 l-15 f-600 m-0">I agree with <span className="text-primary cursor-pointer" onClick={termsHandler}> Terms </span>and <span className="text-primary cursor-pointer" onClick={privacyHandler}>Privacy</span></label>
                    </div>
                    {errorBox && <div className={`${styles["error-box"]}`}>
                        <span className="font-12 f-500">{errorMsg}</span>
                    </div>}
                    <button type="submit" className="border-none btn btn-primary btn-default-width mt-2 cursor-pointer">Register</button>
                    <div className="d-flex border-top mt-3 p-relative d-justify-center">
                        <div className="font-12 l-16 p-absolute top--8 bg-white pr-2 pl-2 f-500 text-center ">Or login using</div>
                    </div>
                    <div className="d-flex d-justify-center gap-2 mt-2">
                        <div className="cursor-pointer" onClick={signInWithGoogleHandler}>
                            <Google></Google>
                        </div>
                        <div className="cursor-pointer" onClick={signInWithAppleHandler}>
                            <Apple></Apple>
                        </div>
                        <div className="cursor-pointer" onClick={signInWithFacebookHandler}>
                            <FacebookDark></FacebookDark>
                        </div>
                    </div>
                    <span className="font-16 l-24 f-500 text-center mt-1">Already a member?<span onClick={props.loginHandler} className=" text-gradient text-center cursor-pointer">Log in</span></span>
                    
                </div>
            </form>
            
            {loading && <Loader/>}
        </Modal>
        </>
    );
}
export default SignupModal;