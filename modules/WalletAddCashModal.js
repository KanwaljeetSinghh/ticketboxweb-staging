import ModalWithBg from "./Modal-with-bg";
import Plus from "../icons/plus";
import styles from './css/modal.module.css';
import { useState,useEffect,useRef } from "react";
import { getOnBoardFromCookie } from "../auth/userCookies";
import CryptoJS from "crypto-js";
import ModalLoader from "./ModalLoader";
import NewCardModal from "./NewCardModal";
export default function WalletAddCashModal(props){
    const queryRef = useRef(null);
    const [cards, setCards] = useState(null)
    const [amount,setAmount] = useState(10);
    const [cardId,setCardId] = useState(null);
    const [errorBox,setErrorBox] = useState(false)
    const [errorAmount, setErrorAmount]  = useState(false)
    const [errorCard,setErrorCard] = useState(false)
    const [addCardModal, setAddCardModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const amountHandler = (e) => {
        setErrorAmount(false)
        setErrorBox(false)
        if(e.currentTarget.value>0){
            setAmount(e.currentTarget.value)
        }
    }
    const newCardModalHandler = () => {
        setAddCardModal(prev => !prev)
    }
    const validator = () => {
        let res = true
        if(amount < 1){
            setErrorAmount(true)
            setErrorBox(true)
            res = false;
        }
        if(cardId == null){
            setErrorCard(true)
            setErrorBox(true)
            res = false;
        }
        return res ;
    }
    const submitHandler = (e) =>{
        const token = getOnBoardFromCookie();
        let result = validator();
        if(result){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "amount": amount,
                "card": cardId
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/wallet/addCash/stripe", requestOptions)
            .then(response => response.json())
            .then(result => {
                props.handler()
            })
            .catch(error => console.log('error', error));
        }
        e.preventDefault();
    }
    const cardsListHandler = (arr) =>{
        setCards(arr)
        setAddCardModal(prev => !prev)
    }
    useEffect(()=>{
        const token = getOnBoardFromCookie();
        if(!queryRef.current)
        {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/stripe/cards", requestOptions)
            .then(response => response.json())
            .then(result => {
                let code = "";
                let parsed = "";
                let arr = [];
                result.cards.map((item) =>{
                    code = CryptoJS.AES.decrypt(item.encryptedCode,process.env.key);
                    parsed = JSON.parse(code.toString(CryptoJS.enc.Utf8));
                    let cardId = item.stripeCardId;
                    let obj={
                        parsed,cardId
                    }
                    arr.push(obj)
                })
                setCards(arr)
            })
            .catch(error => console.log('error', error));
        }
        queryRef.current = true ;
    },[cards]);
    if(cards == null){
        return <ModalWithBg title="Your Wallet">
                <ModalLoader/>
            </ModalWithBg>
    }
    return (
        <ModalWithBg title="Your Wallet" handler={props.handler}>
            <div className={styles["wallet-tabs"]}>
                <div className={`d-flex d-flex-wrap bg-smoke p-1 pl-3 pr-3 d-justify-space-around  rounded ${styles["modalquery-tabs"]}`}>
                    <span type="0" className={`e-tab font-18 l-20 font-600 p-1 pl-3 pr-3 cursor-pointer`} onClick={props.walletModal}>Points Earned</span>
                    <span type="1" className={`e-tab font-18 l-20 font-600 p-1 pl-3 pr-3 cursor-pointer ${styles["active"]}`} onClick={props.handler}>My Cash</span>
                </div>
            </div>
            <form onSubmit={submitHandler}>
                <div className="d-flex d-flex-wrap ">
                    <label className="mt-2 text-black f-600">Enter amount ( in USD )</label>
                    <div className={`col-12 mt-2 border-bottom ${styles["add-cash"]}`}>
                        <input type="number" placeholder="amount " value={amount} onChange={amountHandler}/>
                    </div>
                    <div className="col-12 d-flex mt-4 d-flex-wrap d-justify-space-between d-align-center">
                        <h4 className="f-700 l-20 mb-0">Select card</h4>
                        <span className="bg-gradient text-white rounded f-700 l-20 p-1 font-12 cursor-pointer" onClick={newCardModalHandler}>add new card</span>
                    </div>
                    <div className="d-flex d-flex-wrap col-12 ">
                        {cards.map((item,index)=>{return <label className={`mt-2 ${styles["card-wrapper"]}`} onClick={e => {setCardId(item.cardId);setErrorBox(false)}}>
                            <div className="d-flex d-flex-wrap">
                                <svg id="Layer_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                                    <g><path d="m512 163v-27c0-30.928-25.072-56-56-56h-400c-30.928 0-56 25.072-56 56v27c0 2.761 2.239 5 5 5h502c2.761 0 5-2.239 5-5z"/>
                                    <path d="m0 205v171c0 30.928 25.072 56 56 56h400c30.928 0 56-25.072 56-56v-171c0-2.761-2.239-5-5-5h-502c-2.761 0-5 2.239-5 5zm128 131c0 8.836-7.164 16-16 16h-16c-8.836 0-16-7.164-16-16v-16c0-8.836 7.164-16 16-16h16c8.836 0 16 7.164 16 16z"/></g>
                                </svg>
                                <div className="d-flex d-flex-column">
                                    <span className="f-600 font-12 secondary-font" htmlFor="credit">{item.parsed.card_number}</span>
                                    <span className="f-500 font-10 op-08 z-index-2" htmlFor="credit">Expiry : {item.parsed.card_date}</span>
                                </div>
                            </div>
                            <input type="radio" name="payment" id={index}/>
                        </label>})}
                    </div>
                    <div className="col-12 d-flex d-justify-center">
                    {errorBox && <div className="col-12 col-sm-8 error-box mt-2 d-flex d-justify-space-between">
                        {errorAmount && <li className="f-500 font-12">Enter the amount</li>}
                        {errorCard && <li className="f-500 font-12">Select the card</li>}
                    </div>}
                    </div>
                    <button type="submit"  className="col-12 btn btn-primary border-none btn-default-width mt-2 font-16 f-600 rounded l-20 ">Confirm payment</button>
                </div>
            </form>
            {loading && <ModalLoader/>}
            {addCardModal && <NewCardModal handler={newCardModalHandler} cardsHandler={cardsListHandler}/>}
        </ModalWithBg>
    );

}