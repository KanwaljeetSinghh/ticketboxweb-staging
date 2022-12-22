import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
import Copy from "../icons/copy";
import Share from "../icons/share";
import { useState,useRef,useEffect } from "react";
import { getOnBoardFromCookie,getOnBoardUserFromCookie } from "../auth/userCookies";
import ModalLoader from "./ModalLoader";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton
} from "react-share";
export default function ReferFriendModal(props){
    const queryRef = useRef(false)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = getOnBoardUserFromCookie();
    const [referralCode,setReferralCode] = useState(user.referralCode)
    const copyCodeHandler = () => {
        document.getElementById("copy").classList.toggle(styles["share"])
        setTimeout(()=>{
            document.getElementById("copy").classList.toggle(styles["share"])
        },[1000])
        var copyText = document.getElementById("referralCode");
        copyText.select();
        document.execCommand("copy",false,copyText)
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied";
    }
    const showCodeHandler = () => {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "copied";
    }
    const shareHandler = () => {
        document.getElementById("share-icons").classList.toggle(styles["share"])
    }
    useEffect(()=>{
        if(!queryRef.current){
            const token = getOnBoardFromCookie();
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/wallet/info", requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
        queryRef.current = true ;
    },[])
    if(data == null){
        return (
            <ModalWithBg title="Refer a friend">
               <ModalLoader/>
            </ModalWithBg>
        )
    }
    return (
        <ModalWithBg title="Refer a friend" handler={props.handler}>
            <div className={`d-flex pr-2 pl-2 d-justify-space-between mt-5 ${styles["refer-friend"]}`}>
                <div className="text-center">
                    <span className="font-14 l-24 f-600">Your referral points</span>
                    <h2 className="f-700 l-32">{data.referralPoints}</h2>
                </div>
                <div className="text-center">
                    <span className="font-14 l-24 f-600">Your total referrals</span>
                    <h2 className="f-700 l-32">{data.totalReferral}</h2>
                </div>
            </div>
            {/* <div className={`d-flex d-justify-space-between mt-2 mb-1 d-align-center ${styles["wallet"]}`}>
                <input type="text" placeholder="Enter your reward code"></input>
                <span className="text-grey font-14 l-24 f-600 cursor-pointer">Apply</span>
            </div> */}
            <div className="d-flex d-flex-column d-align-center mt-5 pb-5 pb-extra border-bottom">
                <span className="text-center f-600 font-14 l-20">Share your referral code</span>
                <div className="d-flex border-primary rounded mt-2 p-2 d-align-center">
                    <h4 className="f-600 l-24 text-primary m-0 mr-1">{referralCode}</h4>
                    <textarea className="d-none" value={referralCode} id="referralCode" />
                    <div className={styles["tooltip"]} id="copy">
                        <span className={styles["tooltiptext"]} id="myTooltip">Copy</span>
                        <div onClick={copyCodeHandler} onmouseout={showCodeHandler}>
                            <Copy/>
                        </div>
                    </div>
                    <div className={`${styles["tooltip"]} ml-1 `} id="share-icons" >
                   
                        <span className={`${styles["tooltiptext"]} cursor-pointer d-flex gap-1 d-justify-center`} id="myTooltip">
                            <WhatsappShareButton
                                title={`Use this code :${referralCode}`}
                                url={`https://ticketboxonline.com`}
                                style={{
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >
                                <svg height="512" viewBox="0 0 176 176" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_09.whatsapp" data-name="09.whatsapp"><circle id="background" cx="88" cy="88" fill="#29a71a" r="88"/><g id="icon" fill="#fff"><path d="m126.8 49.2a54.57 54.57 0 0 0 -87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53a54.56 54.56 0 0 0 63.09-87.21zm-8.59 68.56a42.74 42.74 0 0 1 -49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1 -.22 60.19z"/><path d="m116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15c-12.09-11.21-15.23-20.54-14.47-27.94.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1 -.49 4l-2.25 2.92a3.87 3.87 0 0 0 -.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z"/></g></g></g></svg>
                            </WhatsappShareButton>
                            <FacebookShareButton
                                title={`Use this code :${referralCode}`}
                                url={`https://ticketboxonline.com`}
                                style={{
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >
                                <svg id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m512 256c0 127.78-93.62 233.69-216 252.89v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.38-19.2-216-125.11-216-252.89 0-141.38 114.62-256 256-256s256 114.62 256 256z" fill="#1877f2"/><path d="m355.65 330 11.35-74h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979h32.281v-63s-29.296-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111v-178.889z" fill="#fff"/></g></svg>  
                            </FacebookShareButton>
                            <TwitterShareButton
                                title={`Use this code :${referralCode}`}
                                url={`https://ticketboxonline.com`}
                                style={{
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >
                                <svg height="512" viewBox="0 0 152 152" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="Color"><g id="_04.Twitter" data-name="04.Twitter"><circle id="Background" cx="76" cy="76" fill="#03a9f4" r="76"/><path id="Icon" d="m125.23 45.47a42 42 0 0 1 -11.63 3.19 20.06 20.06 0 0 0 8.88-11.16 40.32 40.32 0 0 1 -12.8 4.89 20.18 20.18 0 0 0 -34.92 13.8 20.87 20.87 0 0 0 .47 4.6 57.16 57.16 0 0 1 -41.61-21.11 20.2 20.2 0 0 0 6.21 27 19.92 19.92 0 0 1 -9.12-2.49v.22a20.28 20.28 0 0 0 16.17 19.82 20.13 20.13 0 0 1 -5.29.66 18 18 0 0 1 -3.83-.34 20.39 20.39 0 0 0 18.87 14.06 40.59 40.59 0 0 1 -25 8.61 36.45 36.45 0 0 1 -4.83-.28 56.79 56.79 0 0 0 31 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.16 40.16 0 0 0 10.04-10.48z" fill="#fff"/></g></g></g></svg>  
                            </TwitterShareButton>
                        </span>
                        <div onClick={shareHandler}>
                            <Share/>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div  className="mb-5 mt-5">
                <div className="d-flex d-align-center">
                    <h5 className='secondary-font f-700 l-20 m-0 mr-1'>How it works ?</h5>
                </div>
                <p className="font-14 f-500 l-20 mt-2 text-light-grey">
                    Every $1 spent on a ticket earns 1 point. Every successful referral earns 50 points each.
                    100 points can be redeemed for $1 or any part thereof.
                </p>
            </div>
            {loading && <Loader/>}
        </ModalWithBg>
    );

}