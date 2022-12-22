import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
import { useEffect, useRef, useState } from "react";
import { getOnBoardFromCookie } from "../auth/userCookies";
export default function WalletPointRedeem(props){
   
    return (
        <ModalWithBg title=" Wallet" handler={props.handler}>
            <div className={`d-flex d-flex-column d-align-center ${styles["redeem-points-modal"]}`}>
                <img src="/images/Congrats.png"/>
                <h3 className="f-700 l-28 mt-2">Congratulations!</h3>
                <span className="font-14 l-20 f-500 text-center text-light-grey">{props.msg} </span>
                <a className="btn btn-primary btn-default-width mt-4 font-16 f-600 rounded l-20" onClick={props.walletModalHandler}>View Wallet</a>
            </div>
        </ModalWithBg>
    );

}