import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
import WalletPointsEarnedModal from "./WalletPointsEarnedModal";
import WalletMyCashModal from "./WalletMyCashModal";
import { useState,useRef,useEffect } from "react";
import { getOnBoardFromCookie } from "../auth/userCookies";
import ModalLoader from "./ModalLoader";
export default function WalletModal(props){
    function handler(){
        $("."+styles["accordian"]).toggleClass(styles["active"]);
    }
    const tabRef = useRef();
    const queryRef = useRef(false)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [tab,setTab] = useState(0);
    const tabHandler = (e) => {
        tabRef.current.querySelectorAll("span").forEach((item)=>{
            item.classList.remove(styles.active)
        })
        e.currentTarget.classList.add(styles.active);
        setTab(e.currentTarget.getAttribute("value"))
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
            <ModalWithBg title="Your Wallet">
               <ModalLoader/>
            </ModalWithBg>
        )
    }
    return (
        <ModalWithBg title="Your Wallet" handler={props.handler}>
            {loading && <Loader/>}
            <div className={styles["wallet-tabs"]}>
                <div ref={tabRef} className={`d-flex d-flex-wrap bg-smoke p-1 pl-3 pr-3 d-justify-space-around  rounded ${styles["modalquery-tabs"]}`}>
                    <span value="0" className={`e-tab font-18 l-20 font-600 cursor-pointer p-1 pl-3 pr-3 ${styles["active"]}`} onClick={tabHandler}>Points Earned</span>
                    <span value="1" className="e-tab font-18 l-20 font-600 cursor-pointer p-1 pl-3 pr-3"  onClick={tabHandler}>My Cash</span>
                </div>
            </div>
            {tab==0 && <WalletPointsEarnedModal data={data} handler={props.pointRedeemHandler} walletModalHandler={props.walletModalHandler}></WalletPointsEarnedModal>}
            {tab==1 && <WalletMyCashModal  data={data} handler={props.addCashHandler}></WalletMyCashModal>}
        </ModalWithBg>
    );

}