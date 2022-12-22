import {useState} from 'react'
import styles from './css/modal.module.css'
import Modal from "./Modal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useFirebaseAuth from "../auth/useFirebaseAuth";
import ModalLoader from './ModalLoader';
export default function ForgotPassword(props) {
    const [tab,setTab] = useState(0)
    const [email,setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorBox, setErrorBox] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const [loading,setLoading] = useState(false)
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const {resetPasswordWithEmail} = useFirebaseAuth();

    const emailHandler = (e) =>{
        setEmail(e.target.value);
        setErrorEmail(false)
        setErrorBox(false)
    }
    const validator = () =>{
        let res = true;
        if(email === ''){
            setErrorEmail(true);
            res = false
        }else{
            setErrorEmail(false);
        }
        return res;
    }
    const emailCheckHandler = () =>{
        if(reg.test(email)){
            setErrorEmail(false);
        }else{
            setErrorEmail(true);
        }
    }
    const submitHandler = () => {
        const result = validator();
        if(result){
            setLoading(true)
            resetPasswordWithEmail(email)
            .then(result => {
                setTab(1)
                setLoading(false)
            })
            .catch(error => {
                setErrorBox(true)
                setErrorMsg(error.message)
                setLoading(false)
            })
        }
    }
    return (
        <Modal  modalClass="modal-sign" cross="yes" handler={props.handler}>
            {tab==0 && <div className='d-flex mt-3 d-flex-column'>    
                <h4 className="f-600 l-23 m-0 mb-1">Enter your email</h4>
                <span className="font-14 l-20 f-500 mb-5 col-12">Enter your e-mail to reset your password</span>
                <label >Email</label>
                <input type="text" placeholder="example@mail.com"  className={`${errorEmail && styles["error"]} mb-1`} value={email} onChange={emailHandler} onBlur={emailCheckHandler}></input>
                {errorEmail && <span className={`font-10 f-700 text-danger `}>Please enter valid email.</span>}
                {errorBox && <div className={`${styles["error-box"]} mt-3 `}>
                    <span className="f-500 font-12">{errorMsg}</span>
                </div>}
                <button type="submit" className="btn btn-primary cursor-pointer btn-default-width mt-5 border-none" onClick={submitHandler}>Send me Link</button>
            </div> }
            {tab == 1 && <div className='d-flex d-flex-column d-justify-center mt-3'>
                <h3 className="f-600 l-23 m-0 mb-1">Email sent.</h3>
                <span className="font-14 l-20 f-500 mt-3 col-12">Email for reset the password has been successfully sent to <b className='text-primary'>{email} .</b></span>
                <span className="font-14 l-20 f-500 mt-5 col-12">Please check your email.</span>

            </div>}  
            {loading && <ModalLoader/>}                 
        </Modal>
    )
}
