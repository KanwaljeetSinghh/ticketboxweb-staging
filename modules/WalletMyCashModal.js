import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
import { getOnBoardUserFromCookie } from "../auth/userCookies";
export default function WalletMyCashModal(props){
    const user = getOnBoardUserFromCookie();
    const currency = user.currency;
    return ( 
        <div className="d-flex d-flex-column d-align-center mt-5 pt-3">
            <img src="/images/salary.png"/> 
            <span className="font-16 l-20 f-700 text-grey mt-5 pt-2">Total Cash : <span className="text-primary">{currency == "USD"?"USD":"TTD"} {props.data.wallet.balance}</span></span>
            <a className="btn btn-primary btn-default-width mt-1 font-16 f-600 rounded l-20" onClick={props.handler}>Add cash to Wallet</a>
        </div>   
    );
}