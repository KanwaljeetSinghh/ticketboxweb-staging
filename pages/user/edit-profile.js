import { useEffect, useState } from "react";
import styles from "../../modules/css/header.module.css";
import styless from "../../modules/css/editprofile.module.css";
import Hidden from "../../icons/hidden";
import { getOnBoardFromCookie, getElementById, getOnBoardUserFromCookie,setOnBoardUserCookie } from "../../auth/userCookies";
import FileUploader from "../../modules/FileUploader";
import Loader from "../../modules/Loader";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Router } from "next/router";
import useFirebaseAuth from '../../auth/useFirebaseAuth.js'
export default function EditProfile() {
    const token = getOnBoardFromCookie();
    const user = getOnBoardUserFromCookie();
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [userName, setUserName] = useState('');
    const [phoneCodeValue, setPhoneCodeValue] = useState(user.countryCode+user.phone)
    const [phone, setPhone] = useState(user.phone);
    const [countryCode,setCountryCode] = useState(user.countryCode)
    const [currencyType, setCurrencyType] = useState('');
    const [currency,setCurrency] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const {resetPasswordWithEmail} = useFirebaseAuth();
    const [email,setEmail] = useState('')
    const [successBox,setSuccessBox] = useState(false)
    const fileUploader = (url,file) => {
        setThumbnail(url);
        setFile(file);
    }
    const userNameHandler = (e) =>{
        setUserName(e.target.value);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styless["show"]);
    }
    const confirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value);
    }
    const submitHandler = (e) =>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "name": userName,
            "image_url": thumbnail,
            "phone": phone,
            "countryCode":countryCode
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/update", requestOptions)
        .then(response => response.json())
        .then(result => {
            setOnBoardUserCookie(result.user)
            setLoading(false);
        })
        .catch(error => console.log('error', error));
        e.preventDefault();
    }
    const passwordChangeHandler = (e) => {
        e.preventDefault();
        setLoading(true)
        resetPasswordWithEmail(email)
        .then((result)=>{
            setSuccessBox(true)
            setLoading(false)
        })
        .catch(error=> console.log(error))
        
    }
    useEffect(()=>{
        const user = getOnBoardUserFromCookie();
        if(user.photo == "null" || user.photo == null){
        }
        else{
            setThumbnail(user.photo);
        }
        setUserName(user.name);
        setEmail(user.email)
        setCountryCode(user.countryCode)
        document.getElementById("header").classList.add(styles["fixed-header"]);  
    },[])
    return (
    
        <div className="container d-flex d-align-center pt-5 pb-5 rounded-20 d-flex-column bg-white">
            <div className={` d-flex d-align-center d-flex-column `}>
                <span className="font-36 mb-5">Edit Profile</span>
                <FileUploader  handler={fileUploader} uploaded={thumbnail?true:false} fileAdded={thumbnail?thumbnail:null}></FileUploader>
            </div>
            <div className={`${styless["edit-profile"]}  d-flex d-flex-wrap col-12 mb-5`}>
                <form onSubmit={submitHandler} className="d-flex d-flex-wrap col-12 col-md-5 height-fc">
                    <label className="col-12">Username</label>
                    <input className="col-12" type="text" placeholder="Enter your name" value={userName} onChange={userNameHandler}/>
                    <label className="col-12">Edit phone number</label>
                    <div className={`col-12 ${styless["edit-profile-phone"]}`}>
                        <PhoneInput
                            country={countryCode}
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
                                backgroundColor:"transparent",
                                width:"100%",
                                border:"none",
                                height:"24px"
                            }}
                        />
                    </div>
                    <div className=" d-flex col-12 d-align-center d-flex-column mt-3">
                        <button type="submit" className="btn btn-default-width border-none btn-primary cursor-pointer">Change Profile</button>
                    </div> 
                </form>
                <form onSubmit={passwordChangeHandler} className={`d-flex d-flex-wrap col-12 col-md-6 mt-5 border-left offset-md-1 ${styless["password-section-wrapper"]}`}>
                    <div className={`${styles["password-section"]} col-12`}>
                        <h2 className="f-700 col-12 l-20 text-primary m-0 mt-2">Change password</h2>
                        <label className="col-12 d-flex">Email</label>
                        <input className="col-12" type="text" placeholder="Enter your name" value={email} readOnly/>
                        {successBox && <div className="success-box">
                            <span className="font-14 f-500">Email for reset the password has been successfully sent to {email}.<br/>Please check your email.</span>
                        </div>}
                        <div className=" d-flex col-12 d-align-center d-flex-column mt-5">
                            <button type="submit" className="btn btn-default-width border-none btn-primary cursor-pointer">Reset password</button>
                        </div>
                    </div>
                </form>
            </div>
             {loading && <Loader/>}
        </div>
    
  )
}
