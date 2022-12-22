import {useState} from 'react'
import styles from './css/modal.module.css';
import Modal from './Modal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Cleave from 'cleave.js/react';
import { getOnBoardFromCookie } from "../auth/userCookies";
import CryptoJs from 'crypto-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
export default function NewCardModal(props) {
    const token = getOnBoardFromCookie();
    // States used for payment cards
    const [cardNumber, setCardNumber] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardFocus, setCardFocus] = useState("");
    const [cardMonth, setCardMonth] = useState("")
    const [cardYear, setCardYear] = useState("")
    const [cardExpiry, setCardExpiry] = useState("");
    const [loading,setLoading] = useState(false)
    const cardNumberHandler = (e) => {
        if(e.target.value.length < 20){
            setCardNumber(e.target.value)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        const details = {
            card_number:cardNumber,
            card_date:cardExpiry.toString(),
            card_cvc:cardCvc
        }
        var data = JSON.stringify(details);
        // encrypt the credentials 
        const credentials = CryptoJs.AES.encrypt(data,process.env.key).toString();
        const raw = {
            code:credentials
        }
        const code = JSON.stringify(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: code,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/stripe/addCard", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
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
                        code = CryptoJs.AES.decrypt(item.encryptedCode,process.env.key);
                        parsed = JSON.parse(code.toString(CryptoJs.enc.Utf8));
                        let cardId = item.stripeCardId;
                        let obj={
                            parsed,cardId
                        }
                        arr.push(obj)
                    })
                    props.cardsHandler(arr);
                    toast.success("Card added successfully",{
                        toastId:"nm-1"
                    })
                })
                .catch(error => console.log('error', error));
            }
            else{
                setLoading(false)
                toast.error("Check card details",{
                    toastId:"nm-2"
                })
                props.handler();
            }
            
        })
        .catch(error => console.log(error));
    }
    return (
        <Modal modalClass="new-card-modal" cross="yes" handler={props.handler}>
            <Cards
                cvc={cardCvc}
                expiry={cardExpiry}
                focused={cardFocus}
                name={cardName}
                number={cardNumber}
            />
            <form onSubmit={submitHandler} className="pl-4 pr-4">
                <div className='d-flex d-flex-wrap d-justify-space-between mt-4'>
                    <div className='col-12 mb-2'>
                        <label>Card no.</label>
                        <Cleave placeholder="XXXX XXXX XXXX XXXX" required options={{creditCard: true,blocks: [4,4,4,4]}} name="number" onChange={cardNumberHandler} onFocus={ e => setCardFocus(e.target.name)}/>
                    </div>
                    <div className='col-6 pr-1 mb-2'>
                        <label>Expiry Date</label>
                        <Cleave placeholder="MM-YY" required options={{ date: true, datePattern: ["m", "y"], delimiter: '-', }} name="expiry" onChange={ e => setCardExpiry(e.target.value)}  onFocus={ e => setCardFocus(e.target.name)} className="form-field"/>
                    </div>
                    <div className='col-6 pr-1 mb-2'>
                        <label>CVV</label>
                        <Cleave  placeholder="CVV" required options={{blocks: [3],numericOnly: true }} name="cvc" onChange={ e => setCardCvc(e.target.value)}  onFocus={ e => setCardFocus(e.target.name)} className="form-field"/>
                    </div>
                    <div className='col-12 mb-3'>
                        <label>Name on card</label>
                        <input type="text" placeholder="Enter name" required onChange={ e => setCardName(e.target.value)} name="name" onFocus={ e => setCardFocus(e.target.name)} className="form-field"/>
                    </div>
                    <button type="submit" className='col-12 btn btn-primary border-none cursor-pointer'> Add Card </button>
                </div>
            </form>
            <ToastContainer
                toastClassName={styles["toaster-message"]}
                position={'top-right'}
                hideProgressBar={false}
                closeOnClick={true}
                draggable={true}
            ></ToastContainer>
            {loading && <Loader/>}
        </Modal>
    )
}
