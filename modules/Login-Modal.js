import Modal from "./Modal";
import styles from "../modules/css/modal.module.css";
import Google from "../icons/google";
import Apple from "../icons/apple";
import FacebookDark from "../icons/facebook-dark";
import useFirebaseAuth from "../auth/useFirebaseAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { setOnBoardCookie, setOnBoardUserCookie } from "../auth/userCookies";
import NotVerifiedModal from "./NotVerifiedModal";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginModal(props){
    const [loading, setLoading] = useState(false);
    const {signInWithEmailAndPassword, formatAuthUser, setCookiesLog, signOut,signInWithGoogle,signInWithFacebook,signInWithApple} = useFirebaseAuth();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notVerifiedModal, setNotVerifiedModal] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorBox,setErrorBox] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const router = useRouter();
    const emailHandler = (e) =>{
        setEmail(e.target.value);
        setErrorEmail(false)
        setErrorBox(false)
    }
    const emailCheckHandler = () =>{
        if(reg.test(email)){
            setErrorEmail(false);
        }else{
            setErrorEmail(true);
        }
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
        setErrorPass(false)
        setErrorBox(false)
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const validator = () =>{
        let res = true;
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
        return res;
    }
    const notVerifiedModalHandler = () =>{
        setNotVerifiedModal(prev => !prev);
    }
    const submitHandler = (e) =>{
        e.preventDefault();
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
            .then((result) => {
                if(result.status){
                    signInWithEmailAndPassword(email,password)
                    .then(authUser => {
                        var formattedUser = formatAuthUser(authUser.user);
                        if(formattedUser.verified){
                            var body = {
                                "displayName": formattedUser.name? formattedUser.name:"User",
                                "email": formattedUser.email,
                                "photoUrl": formattedUser.photoURL,
                                "phone": formattedUser.phoneNumber,
                                "referralCode":formattedUser.referralCode,
                                "type":"web"
                            }
                            var raw = JSON.stringify(body);
                            var myHeaders = new Headers();
                            myHeaders.append("Accept", "application/json");
                            myHeaders.append("Authorization", "Bearer " + formattedUser.token);
                            myHeaders.append("Content-Type", "application/json");
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                            fetch(process.env.URL+"/user/onboarding", requestOptions)
                            .then((response) => response.json())
                            .then(response =>{
                                if(response.user.isEmailVerified){
                                    setOnBoardCookie(response.token);
                                    setOnBoardUserCookie(response.user);
                                    props.handler();
                                    router.push("/user");
                                    setLoading(false);
                                }
                                else{
                                    signOut().then(()=>{});
                                    setLoading(false);
                                    setErrorBox(true)
                                    setErrorMsg("Please verify your email first");
                                    toast.error("Please verify your email first",{
                                        toastId:"lm-1"
                                    })
                                }
                            })
                            .catch(error =>{
                                signOut(()=>{})
                                setLoading(false);
                                setErrorBox(true)
                                setErrorMsg(error.message);
                                toast.error(error.message,{
                                    toastId:"onboardingerror-1"
                                })
                            })
                        }
                        else{
                            signOut().then(()=>{});
                            setLoading(false);
                            setErrorBox(true)
                            setErrorMsg("Please verify your email first");
                            toast.error("Please verify your email first",{
                                toastId:"verifyLoginEmailFirst-1"
                            })
                        }
                    })
                    .catch((error) => {
                        setErrorBox(true)
                        setLoading(false);
                        if(error.code == "auth/user-not-found"){
                            toast.error("Email not found",{
                                toastId:"firbaseloginerror-1"
                            })
                            setErrorMsg("Email not found");
                        }
                        else if(error.code == "auth/wrong-password"){
                            toast.error("Incorrect Password",{
                                toastId:"firbaseloginerror-2"
                            })
                            setErrorMsg("Incorrect Password");
                        }
                        else{
                            toast.error("Something went wrong",{
                                toastId:"firbaseloginerror-3"
                            })
                            setErrorMsg("Something went wrong.");
                        }
                    })
                }
                else{
                    setLoading(false)
                    setErrorBox(true)
                    signOut().then(()=>{})
                    setErrorMsg("The email address has already used in host panel.")
                    toast.error("The email address has already used in host panel.",{
                        toastId:"VerifyError-1",
                    })
                }
            })
            .catch((error)=>{
                setLoading(false)
                toast.error("We are unable to verify your email. Please refresh and try again later",{
                    toastId:"webverify-2",
                })
            })
        }
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
            .then(result => {
                if(result.status){
                    var formattedUser = formatAuthUser(authUser.user);
                    setCookiesLog(formattedUser);
                    if(authUser){
                        setTimeout(()=>{
                            router.push("/");
                        },1500)
                    } 
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
        .catch((error) => {
            setErrorBox(true)
            setErrorMsg(error.message);
            setLoading(false);
        })
    }
    const signInWithFacebookHandler = () =>{
        signInWithFacebook()
        .then(authUser => {
            var formattedUser = formatAuthUser(authUser.user);
            setCookiesLog(formattedUser);
            if(authUser){
                setTimeout(()=>{
                    router.push("/");
                },1500)
            } 
        })
        .catch((error) => {
            setErrorBox(true)
            setErrorMsg(error.message);
            setLoading(false);
        })
    }
    const signInWithAppleHandler = () =>{
        signInWithApple()
        .then(authUser => {
            var formattedUser = formatAuthUser(authUser.user);
            setCookiesLog(formattedUser);
            if(authUser){
                setTimeout(()=>{
                    router.push("/");
                },1500)
            } 
        })
        .catch((error) => {
            setErrorBox(true)
            setErrorMsg(error.message);
            setLoading(false);
        })
    }
    
    return (
        <>
            <Modal modalClass="modal-sign" cross="yes" handler={props.handler}>
                {loading && <Loader></Loader>}
                <form onSubmit={submitHandler}>
                    <div className={`d-flex d-flex-column gap-1 ${styles["centered"]}`} >
                        <h4 className="f-600 l-23 m-0 mb-1">Log in</h4>
                        <span className="font-14 l-20 f-500 mb-4">Please login to continue with this Application</span>
                        <label >Email</label>
                        <input type="email" className={`${errorEmail && styles["error"]}`} placeholder="example@gmail.com" value={email} onChange={emailHandler} onBlur={emailCheckHandler} />
                        {errorEmail && <span className={`font-10 f-700 text-danger `}>Please enter valid email.</span>}
                        <label >Password</label>
                        <div className={`${styles["password"]}  ${errorPass && styles["error"]} d-flex d-justify-space-between d-align-center`}>
                            <input type="password" placeholder="Enter your password" value={password} onChange={passwordHandler} />
                            <input type="text" placeholder="Enter your password" value={password} onChange={passwordHandler} />
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
                        <span className="text-gradient cursor-pointer f-600 font-14 l-20 text-right" onClick={props.forgot}>Forgot password?</span>
                        {errorBox && <div className={`${styles["error-box"]}`}>
                            <span className="font-12 f-500 col-12 text-center">{errorMsg}</span>
                        </div>}
                        <button type="submit" className="btn btn-primary cursor-pointer btn-default-width mt-2 border-none" >Log in</button>
                        <div className="d-flex border-top mt-75 p-relative d-justify-center">
                            <div className="font-12 l-16 p-absolute top--8 bg-white pr-2 pl-2 f-500 text-center ">Or login using</div>
                        </div>
                        <div className="d-flex d-justify-center gap-2 mt-5">
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
                        <span className="font-13 l-16 f-600 text-center mt-3">You don't have an account?<span onClick={props.signUpHandler} className=" text-primary  cursor-pointer">Register here</span></span>
                    </div>
                </form>
                {notVerifiedModal && <NotVerifiedModal handler={notVerifiedModalHandler}></NotVerifiedModal>}
            </Modal> 
            <ToastContainer
                toastClassName={styles["toaster-message"]}
                position={'top-right'}
                hideProgressBar={false}
                closeOnClick={true}
                draggable={true}
            ></ToastContainer>
        </>
    );
}