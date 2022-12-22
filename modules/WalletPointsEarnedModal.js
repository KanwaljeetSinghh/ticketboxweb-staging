import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
import Copy from "../icons/copy";
import Arrow from "../icons/arrow";
import { useState, useEffect,useRef } from "react";
import { getOnBoardFromCookie,getOnBoardUserFromCookie } from "../auth/userCookies";
import ModalLoader from "./ModalLoader";
export default function WalletPointsEarnedModal(props){
    const user = getOnBoardUserFromCookie();
    const [referralCode,setReferralCode] = useState(user.referralCode)
    const [pointsError, setPointsError] = useState(false)
    const [loading,setLoading] = useState(false)
    function handler(){
        document.getElementById("accordian").classList.toggle(styles.active);
    }
    const pointsRedeemHandler = () => {
        if(props.data.wallet.points>49){
            const token = getOnBoardFromCookie();
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/wallet/redeem-point", requestOptions)
            .then(response => response.json())
            .then(result => props.handler(result))
            .catch(error => console.log('error', error));
        }
        else{
            setPointsError(prev => !prev)
        }
    }
    const copyCodeHandler = () => {
        var copyText = document.getElementById("referralCode");
        copyText.select();
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied";
    }
    const showCodeHandler = () => {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "copied";
    }
    return (
        <>
            <div className="d-flex d-flex-column d-align-center pt-3">
                <img src="/images/points.png"/>
                <span className="font-16 f-700 l-20 mt-5 mb-4">Total Earned : <span className="text-primary">{Math.round(props.data.wallet.points)} points</span></span>
                {pointsError && <span className="error-box mb-2">Minimum 50 points are required</span>}
                <a className="btn btn-primary btn-default-width" onClick={pointsRedeemHandler} >Redeem Points</a>
            </div>
            <div className="d-flex d-flex-column d-align-center mt-4 ml-5 mr-5 pb-3 border-bottom">
                <span className="text-center f-600 font-14 l-20">Share your referral code</span>
                <div className="d-flex border-primary rounded mt-2 p-2 d-align-center">
                    <h4 className="f-600 l-24 text-primary m-0 mr-1">{referralCode}</h4>
                    <textarea className="d-none" value={referralCode} id="referralCode" />
                    <div className={styles["tooltip"]} onClick={copyCodeHandler}  onmouseout={showCodeHandler}>
                        <span className={styles["tooltiptext"]} id="myTooltip">Copy code</span>
                        <Copy></Copy>
                    </div>
                </div>
            </div>
            <div  className={`${styles["accordian"]} mb-5 ml-5 mr-5 mt-2 cursor-pointer`} id="accordian" onClick={handler}>
                <div className="d-flex d-align-center">
                    <h5 className='secondary-font f-700 l-20 m-0 mr-1'>How it works ?</h5>
                    <Arrow color="#000000" ></Arrow>
                </div>
                <p className="font-14 f-500 l-20 mt-1">
                    Every $1 spent on a ticket earns 1 point. Every successful referral earns 50 points each.
                    100 points can be redeemed for $1 or any part thereof.
                </p>
            </div>
            {loading && <ModalLoader/>}
        </>
    );

}