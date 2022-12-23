import { useEffect, useState,useRef } from "react";
import Arrow from "../../../icons/arrow";
import styles from "../../../modules/css/header.module.css";
import styless from "../../../modules/css/payment.module.css";
import ToggleIcon from "../../../modules/ToggleIcon";
import Plus from "../../../icons/plus";
import VoucherModal from "../../../modules/Voucher-Modal";
import { getOnBoardFromCookie,getOnBoardUserFromCookie,setPaymentDetailCookie,removePaymentDetailCookie } from "../../../auth/userCookies";
import { useRouter,Router } from "next/router";
import Moment from 'react-moment';
import DropDown from "../../../modules/TicketsDropDown";
import TicketsAdder from "../../../modules/TicketsAdder";
import LoginInstruction from "../../../modules/loginInstruction";
import Loader from '../../../modules/Loader';
import NewCardModal from "../../../modules/NewCardModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJs from 'crypto-js'
import VerifySuccess from "../../../modules/VerifySuccess-Modal";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
export default function PaymentDetails() {
    const router = useRouter();
    const user = getOnBoardUserFromCookie();
    const currency = user.currency;
    let queryRef = useRef(false)
    const slotRef = useRef(null);
    const ticketsRef = useRef(null);
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [loginInstruction ,setLoginInstruction] = useState(false)
    const [walletInfo, setWalletInfo] = useState('')
    const [walletBalance,setWalletBalance] = useState(0);
    const [firstName, setFirstName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [countryCode,setCountryCode] = useState(user.countryCode);
    const [phonenumber, setPhoneNumber] = useState(user.countryCode+user.phone);
    //is for other details
    const [isForOther, setIsForOther] = useState(false);
    const [secondName, setSecondName] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [secondEmail, setSecondEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [secondPhonenumber, setSecondPhoneNumber] = useState('');
    const [phoneCodeValue,setPhoneCodeValue] = useState('')
    const [addMore, setAddMore] = useState(false);
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingFees, setBookingFees] = useState(0);
    const [payable, setPayable] = useState(0);
    const [voucher,setVoucher] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [paymentType,setPaymentType] = useState("stripe");
    const [useWallet,setUseWallet] = useState(false)
    const [coupon, setCoupon] = useState(null);
    const [discount,setDiscount] = useState(0);
    const [eventId, setEventId] = useState(null);
    const [slot, setSlot] = useState({
        startDateTime:0,
        endDateTime:0
    });
    const [notComplimentaryTickets,setNotComplimentaryTickets] = useState([])
    // The state used for shown the cards detail page
    const [cardPage, setCardPage] = useState(false);
    const [newCardModal, setNewCardModal] = useState(false)
    const [cardsDet, setCardsDet] = useState([]);
    // success booking
    const [verifySuccessModal,setVerifySuccessModal] = useState(false)
    const [bookingId,setBookingId] = useState(null)
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // normal name & phone number change handlers
    const firstNameHandler = (e) =>{
        setFirstName(e.target.value);
    }
    const phoneNumberHandler = (e) =>{
        setPhoneNumber(e.target.value);
    }
    // separate details name ,email, phone change handlers
    const isForOtherHandler = () => {
        setIsForOther(prev => !prev)
    }
    const secondNameHandler = (e) =>{
        setSecondName(e.target.value);
        setErrorName(false)
    }
    const setPaymentTypeHandler = (e) => {
        setPaymentType(e.currentTarget.getAttribute("value"))
    }
    const emailHandler = (e) =>{
        setErrorEmail(false)
        setSecondEmail(e.currentTarget.value)
    }
    const slotHandler = (e) => {
        let ele = slotRef.current.querySelectorAll("div");
        ele.forEach(item => {
            item.classList.remove(styless.active);
        });
        e.currentTarget.classList.add(styless.active);
        let obj = {
            "startDateTime": e.currentTarget.getAttribute("start-time"),
            "endDateTime": e.currentTarget.getAttribute("end-time")
        }
        setSlot(obj);
    }
    const emailCheckHandler = () =>{
        if(!reg.test(secondEmail)){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }
    }
    const validator = () =>{
        let res = true;
        if(isForOther){
            if(secondName == ''){
                setErrorName(true);
                toast.error("Fill basic details",{
                    toastId:"em-1"
                })
                res = false;
            }
            else{
                setErrorEmail(false);
            }
            if(secondEmail == ''){
                setErrorEmail(true);
                toast.error("Fill basic details",{
                    toastId:"em-2"
                })
                res = false;
            }
            else{
                setErrorEmail(false);
            }
        }
        if(slot.startDateTime == 0 || slot.endDateTime == 0){
            toast.error("Select ticket slot",{
                toastId:"em-3"
            })
            res = false;
        }
        if(ticketCount == 0){
            toast.error("Select ticket ",{
                toastId:"em-4"
            })
            res = false;
        }
        if(paymentType == ""){
            toast.error("Select payment type",{
                toastId:"em-5"
            })
            res = false;
        }
        return res;
    } 
    const feesCalculator = (amount) => {
        const token = getOnBoardFromCookie();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "amount": amount
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.URL+"/user/booking/getFees", requestOptions)
        .then(response => response.json())
        .then(result => {
            setBookingFees(result.fees)
            let pay = parseFloat(result.fees) 
            setPayable(amount+pay);
        })
        .catch(error => console.log('error', error));
    }
    const ticketCountHandler = (type,amt,cnt=1) =>{
        if(type == "inc"){
            let amount = parseFloat(amt)
            let total = totalPrice + amount;
            feesCalculator(total)
            setTicketCount(prev => prev + 1);
            setTotalPrice(prev => prev + amount);
        }
        else if(type == "dec"){
            if(ticketCount > 0){
                let amount = parseFloat(amt)
                let total = totalPrice - amount;
                feesCalculator(total)
                setTicketCount(prev => prev - 1);
                setTotalPrice(prev => prev - amount);
            }
            else{
                toast.error("Count should not be less than 1",{
                    toastId:"em-7"
                })
            }
        }
        else if(type == "change"){
            let amount = parseFloat(amt)
            let total = totalPrice - (amount*cnt);
            feesCalculator(total)
            setTicketCount(prev => prev - cnt);
            setTotalPrice(total);
        }
        else{
            toast.error("Something went wrong please refresh the page",{
                toastId:"em-8"
            })
        }
    }
    const detailHandler = (e) => {
        const result = validator();
        let selectedTickets = [];
        if(result){
            if(ticketsRef.current.querySelectorAll(".ticket_wrapper .tickets-adder-dropdown").length > 0){
                ticketsRef.current.querySelectorAll(".ticket_wrapper .tickets-adder-dropdown").forEach(item => {
                    for(let i = 0; i<parseInt(item.getAttribute("ticket-count")); i++){
                        let obj = {
                            "type": item.getAttribute("ticket-type"),
                            "price": item.getAttribute("ticket-price"),
                            "count": 1
                        }
                        selectedTickets.push(obj);
                    }
                })
                setTickets(selectedTickets)
            }
            else{
                // Show an modal with message " Something went wrong please refresh the page" and give the button to refresh the page.
            }
            if(paymentType == "stripe"){
                setCardPage(true);
            }
            else if(paymentType == "wipay"){
                wipayPayment(selectedTickets);
            }
            else{
                // Show error "Something went wrong with your Payment Type selection. Please refresh the page once and try again "
            }
        }
        e.preventDefault()
    }
    const addCouponHandler = (e) => {
        setCoupon(e.currentTarget.getAttribute('id'))
        let id = e.currentTarget.getAttribute('id');
        const token = getOnBoardFromCookie();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "coupon_code": id,
            "amount": totalPrice
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/coupon/checkAvailability", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
                setCoupon(result.coupon)
                setDiscount(result.discount)
                setLoading(false)
            }
            else{
                setLoading(false)
                setVoucher(false);
                setCoupon(null)
                toast.error(result.msg,{
                    toastId:"vc-1"
                })
            }
        })
        .catch(error => console.log('error', error));
        setVoucher(false);
    }
    const cancelVoucherHandler = () => {
        setCoupon(null)
        setDiscount(0)
    }
    const stripePayment = (e) => {
        let cardId = e.currentTarget.getAttribute("value");
        let couponCode = ""
        if(coupon){
            couponCode = coupon.code
        }
        let query = {}
        const token = getOnBoardFromCookie();
        if(!isForOther){
            query = {
                "event_id": router.query["id"],
                "tickets": tickets,
                "slot": slot,
                "totalAmount": totalPrice,
                "fees": bookingFees,
                "isForOther": false,
                "paymentType": paymentType,
                "card_id": cardId,
                "useWallet": useWallet,
                "coupon":couponCode,
            }
        }
        else{
            query = {
                "event_id": router.query["id"],
                "tickets": tickets,
                "slot": slot,
                "totalAmount": totalPrice,
                "fees": bookingFees,
                "isForOther": true,
                "separateDetails":{
                    "email":secondEmail,
                    "name":secondName,
                    "phone":secondPhonenumber
                },
                "paymentType": paymentType,
                "card_id": cardId,
                "useWallet": useWallet,
                "coupon":couponCode,
            }
        }
        setLoading(true)
        if(!useWallet){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(query);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/booking/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status){
                    setLoading(false)
                    setVerifySuccessModal(true)
                    setBookingId(result.data._id)
                }
                else{
                    setLoading(false)
                    setCardPage(false)
                    toast.error(result.msg,{
                        toastId:"em-9"
                    })
                    setCoupon(null)
                    setPayable(0)
                    setDiscount(0)
                    setTotalPrice(0)
                    setBookingFees(0)
                    setTicketCount(0)
                }
            })
            .catch(error => console.log('error', error));
        }
        else{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(query);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/booking/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status){
                    setLoading(false)
                    setVerifySuccessModal(true)
                    setBookingId(result.data._id)
                }
                else{
                    setLoading(false)
                    setCardPage(false)
                    toast.error(result.msg,{
                        toastId:"em-10"
                    })
                    setCoupon(null)
                    setPayable(0)
                    setDiscount(0)
                    setTotalPrice(0)
                    setBookingFees(0)
                    setTicketCount(0)
                }
            })
            .catch(error => console.log('error', error));
        }
    }
    const wipayPayment = (ticks) => {
        removePaymentDetailCookie();
        let couponCode = "";
        if(coupon || coupon == ""){
            couponCode = coupon.code
        }
        let query = {}
        if(!isForOther){
            query = {
                "title":data.title,
                "event_id": router.query["id"],
                "tickets": ticks,
                "slot": slot,
                "totalAmount": totalPrice,
                "fees": bookingFees,
                "isForOther": false,
                "paymentType": paymentType,
                "useWallet": useWallet,
                "coupon":couponCode,
            }
        }
        else{
            query = {
                "title":data.title,
                "event_id": router.query["id"],
                "tickets": ticks,
                "slot": slot,
                "totalAmount": totalPrice,
                "fees": bookingFees,
                "isForOther": true,
                "separateDetails":{
                    "email":secondEmail,
                    "name":secondName,
                    "phone":secondPhonenumber
                },
                "paymentType": paymentType,
                "useWallet": useWallet,
                "coupon":couponCode,
            }
        }
        const token = getOnBoardFromCookie();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "event_id": router.query["id"],
            "tickets": ticks,
            "slot": slot,
            "amount": payable-discount,
            "useWallet": useWallet,
            "type": "web"
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        // wipay payment
        if(totalPrice > 0){
            setPaymentDetailCookie(query,isForOther)
            fetch(process.env.URL+"/user/wallet/checkout/wipay", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status){
                    let trxn = data.result.transaction_id;
                    if(typeof trxn === "string" && trxn.trim().length !== 0){
                        window.open(data.result.url,"_self");
                    }
                    else{
                        // Do the things when transation id is empty
                        
                    }
                }
                else{
                    setLoading(false)
                    toast.error(data.msg,{
                        toastId:"em-58"
                    })   
                }
                
            })
            .catch(error => {
                console.log(error)
            });
        }
        // if ticketprice is 0
        else{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(query);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/booking/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status){
                    setLoading(false)
                    setVerifySuccessModal(true)
                    setBookingId(result.data._id)
                    
                }
                else{
                    setLoading(false)
                    toast.error(result.msg,{
                        toastId:"em-10"
                    })
                }
            })
            .catch(error => console.log('error', error));
        }
    }
    const submitHandler = (e) => {
        stripePayment(e);
        e.preventDefault();
    }
    const voucherHandler = () =>{
        setVoucher(prev => !prev);
    }
    const newCardModalHandler = () => {
        setNewCardModal(prev => !prev)
    }
    const cardsListHandler = (arr) =>{
        setCardsDet(arr)
        setNewCardModal(prev => !prev)
    }
    const successToBookingPageHandler = () => {
        setLoading(true)
        router.push(`/user/bookingDetails/${bookingId}`)
        setVerifySuccessModal(false)
    }
    useEffect(()=>{
        setEventId(router.query["id"]);
        const token = getOnBoardFromCookie();
        if(!token){
            setLoginInstruction(true)
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if(eventId){
            fetch(process.env.URL+"/user/event/"+eventId, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result.event)
                if(result.event.slots.length == 1){
                    let obj = {
                        "startDateTime": result.event.slots[0].startDateTime,
                        "endDateTime": result.event.slots[0].endDateTime
                    }
                    setSlot(obj);
                }
                let comp = [];
                result.event.tickets.map((item)=>{
                    if(item.enable && !item.isComplimentary){
                        comp.push(item)
                    }
                })
                setNotComplimentaryTickets(comp)
            })
            .catch(error => console.log('error', error));
        }
        if(!queryRef.current){
            document.getElementById("header").classList.add(styles["fixed-header"]);
            fetch(process.env.URL+"/user/wallet/info", requestOptions)
            .then(response => response.json())
            .then(result => {
                setWalletInfo(result)
                setWalletBalance(result.wallet.balance)
            })
            .catch(error => console.log('error', error));
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
                setCardsDet(arr)
            })
            .catch(error => console.log('error', error));
        }
        queryRef.current = true ;
    },[cardsDet.length, eventId]);

    if(data == null || walletInfo == null){
        return <Loader/>
    }
    else{
        return (
            <>
                {!cardPage && <> 
                    <div className={`container bg-white rounded-20 p-5`}>
                        <div className="col-12 pt-2 pl-2">
                            <p className="font-36 l-20 f-600 mb-1 ">Personal Details</p>
                            <span className="font-14 l-20 f-400 text-grey">Please enter your personal details</span>
                            
                        </div>
                        <form onSubmit={detailHandler} className={`${styless["payment-form"]} d-flex  d-flex-wrap `}>
                            <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column  pl-2">
                                <label className="font-14 f-600 l-20">Full Name</label>
                                <input type="text" readOnly placeholder="Enter name" value={firstName} onChange={firstNameHandler}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column pl-2">
                                <label className="font-14 f-600 l-20">Email</label>
                                <input type="text" placeholder="Enter email" readOnly  value={email} />
                            </div>
                            {phonenumber != "" && <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column pr-2 pl-2">
                                <label className="font-14 f-600 l-20">Contact number</label>
                                <div className={styless["phone-input"]}>
                                    <PhoneInput
                                        country={countryCode}
                                        value={phonenumber}
                                        placeholder="Enter phone"
                                        copyNumbersOnly={true}
                                        disabled={true}
                                        inputStyle={{
                                            backgroundColor:"transparent",
                                            width:"100%",
                                            border:"none",
                                            height:"24px"
                                        }}
                                    />
                                </div>
                            </div>}
                            <label className="font-14 col-12 f-600 l-20 pl-2">Select time</label>
                            <div ref={slotRef} className={`col-12 d-flex d-flex-wrap pl-2 pr-2 ${styless["slots-wrapper"]}`}>
                                {data.slots.map((item,index)=> { return <li key={index} className={`col-12 user-select-none d-flex-wrap `}>
                                        <div className={`cursor-pointer ${styless["slots"]} ${data.slots.length == 1 ? styless["active"]:""}`} onClick={slotHandler} start-time={item.startDateTime} end-time={item.endDateTime}>
                                            <span className="text-secondary font-14 f-300">
                                                <Moment utc format="dddd MMMM D">{item.startDateTime}</Moment>
                                            </span>
                                            <span className="text-primary font-12 f-600 mt-1">
                                                <Moment utc format="hh:mm A" >{item.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{item.endDateTime}</Moment> IST
                                            </span>
                                        </div>
                                    </li>}
                                )}
                            </div>
                            <div className="col-12 mt-2 pr-5 pl-2 mb-1">
                                <div className="col-12  d-flex d-flex-wrap d-align-center">
                                    <div className="col-8 col-sm-7 col-md-5 col-lg-4 d-flex d-flex-wrap d-align-center">
                                        <span className="col-12 font-16 l-20 f-600 mr-5">Book for a friend</span>
                                        <span className="col-12 font-14 l-20 f-400 mt-1 text-light-grey">Please enter your friends personal details</span>
                                    </div>
                                    <ToggleIcon handler={isForOtherHandler}></ToggleIcon>
                                </div>
                                
                                {isForOther && 
                                <div className="d-flex d-flex-wrap">
                                    <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column pr-2">
                                        <label className="font-14 f-600 l-20">First Name</label>
                                        <input type="text" placeholder="Enter name" className={`${errorName && styless["active"]}`} value={secondName}  onChange={secondNameHandler}/>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column pr-1 ">
                                        <label className="font-14 f-600 l-20">Email</label>
                                        <input type="text" placeholder="Enter email " className={`${errorEmail && styless["active"]}`} value={secondEmail}  onChange={emailHandler} onBlur={emailCheckHandler}/>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex d-flex-column  pl-1">
                                        <label className="font-14 f-600 l-20">Phone number</label>
                                        <div className={styless["phone-input"]}>
                                            <PhoneInput
                                                country={'us'}
                                                value={phoneCodeValue}
                                                placeholder="Enter phone"
                                                copyNumbersOnly={true}
                                                
                                                onChange={(value, data) => {
                                                    setSecondPhoneNumber(value.slice(data.dialCode.length))
                                                }}
                                                inputStyle={{
                                                    backgroundColor:"transparent",
                                                    width:"100%",
                                                    border:"none",
                                                    height:"24px"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>}
                                    
                            </div>
                            
                            <div ref={ticketsRef} className="col-12 col-md-6 mt-3 pr-5 pr-2 pl-2 d-flex d-flex-wrap">
                                <h4 className="f-700 l-20 mb-0 col-12">Ticket Type & Price</h4>
                                <span className="mt-1 font-14 l-20 f-500 text-light-grey">Maximum 4 tickets per user</span>
                                <div className="col-12 mt-1">
                                    <TicketsAdder data={notComplimentaryTickets} index="0" count={ticketCount} handler={ticketCountHandler}></TicketsAdder>
                                </div>
                                {addMore && data.tickets.map((item,index) => {
                                    if(index!=0) return ( <div key={`ticket-adder-${index}`} className="col-12">
                                        <TicketsAdder data={notComplimentaryTickets} index={index} count={ticketCount} handler={ticketCountHandler}></TicketsAdder>
                                    </div>
                                    )
                                })}
                                {!addMore && data.tickets.length>1 && <span className="col-12 text-right text-primary" >
                                    <span className="cursor-pointer user-select-none" onClick={()=>{setAddMore(true)}}>
                                        + Add more
                                    </span>
                                </span>}
                                <h4 className="f-700 l-20  mb-0 col-12">Rewards</h4>
                                <span className=" font-14 l-20 f-500 col-12 mt-1 text-light-grey">Select your rewards</span>
                                <div className="bg-smoke-white col-12 rounded mt-1 p-2">
                                    <div className="d-flex d-justify-space-between d-align-center">
                                        <span className="f-500 font-16 l-20">My Wallet</span>
                                        <input type="checkbox" name="points" className="cursor-pointer" onChange={e => setUseWallet(prev => !prev)}/>
                                    </div>
                                    <div className="d-flex d-justify-space-between mt-2">
                                        <span className="col-6 f-600 font-16 l-20 text-primary">Available balance</span>
                                        <span className="col-6 d-flex d-justify-end f-500 font-16 l-24 text-success">{currency=="USD"?"$":"TT$"} {walletBalance}</span>
                                    </div>
                                </div>
                                <h4 className="f-700 l-20 col-12 mb-0 mt-2">Voucher</h4>
                                <div className="bg-smoke-white col-12 border mt-1 rounded p-2 d-flex d-justify-space-between cursor-pointer" onClick={voucherHandler}>
                                    <span className="f-500 font-16 l-24 text-grey">Choose your voucher</span>
                                    <div className="transform-90">
                                        <Arrow color="#808085" ></Arrow>
                                    </div>   
                                </div>
                                {coupon && <div className="border-success d-flex d-justify-space-between  rounded p-1 mt-2">
                                    <span className="text-primary font-14">Coupon <span className="text-success">{coupon.name}</span> has applied.</span>
                                    <span className="font-14 ml-2 op-05 cursor-pointer" onClick={cancelVoucherHandler}>X</span>
                                </div>
                                } 
                            </div>
                            
                            <div className="col-12 col-md-6 mt-3 p-2 pt-0">
                            <h4 className="f-700 l-20 mb-0 col-12">Payment method</h4>
                                <span className="mt-1 font-14 l-20 col-12 d-flex f-500 text-light-grey">Choose your payment method</span>
                                <div className={`mt-1 text-grey ${styless["payment-method"]}`}>
                                    <label htmlFor="credit" className="bg-smoke-white mt-2 rounded p-2 d-flex d-justify-space-between d-align-center cursor-pointer" onClick={setPaymentTypeHandler} value="stripe">
                                        <span className="f-500 font-16 l-20" >Credit Card</span>
                                        {paymentType == "stripe"?
                                            <input type="radio" name="payment" id="credit" checked/>
                                            :
                                            <input type="radio" name="payment" id="credit" />
                                        }
                                    </label>
                                    {currency == "TTD" && <label htmlFor="wipay" className="bg-smoke-white mb-2 rounded p-2 d-flex d-justify-space-between d-align-center cursor-pointer" onClick={setPaymentTypeHandler} value="wipay">
                                        <span className="f-500 font-16 l-20" >TT Debit Card</span>
                                        {paymentType == "wipay"?
                                            <input type="radio" name="payment" id="wipay" checked/>
                                            :
                                            <input type="radio" name="payment" id="wipay" />
                                        }
                                    </label>}
                                </div>
                            </div>
                            <div className={`col-12 col-md-6 mt-4 pl-2`}>
                                <h2 className="l-40 font-700 text-primary mb-1">Booking Summary</h2>
                                <h4 className="l-20 font-700 mt-5 mb-2">Payment Details</h4>
                                <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                                    <span>Ticket price</span>
                                    <span className="text-light-grey">{currency=="USD"?"$":"TT$"} {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                                    <span>Voucher</span>
                                    <span className="text-success">-{currency=="USD"?"$":"TT$"} {discount}</span>
                                </div>
                                <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                                    <span>Booking fees</span>
                                    <span className="text-light-grey">{currency=="USD"?"$":"TT$"} {bookingFees}</span>
                                </div>
                                <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-600">
                                    <span>Total payment</span>
                                    <span className="text-light-grey">{currency=="USD"?"$":"TT$"} {(payable-discount).toFixed(2)}</span>
                                </div>
                                <div className=" mt-4 ">
                                    <button type="submit" className="border-none btn btn-primary cursor-pointer mt-1 btn-large">Confirm your booking</button>
                                </div>
                            </div> 
                        </form>  
                    </div>
                </>}
                {cardPage && <>
                    <div className="container bg-white rounded-20 p-1 d-flex d-flex-wrap pb-5">
                        <div className="col-12 pt-2 pl-2 pr-2 d-flex d-flex-wrap d-justify-space-between d-align-center">
                            <div className="mt-2 col-12 col-xs-8 d-flex d-flex-wrap d-align-center">
                                <div className="cursor-pointer mr-3" onClick={e => setCardPage(prev => !prev)}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.704992 7.82811L5.65166 12.7748C5.76012 12.8841 5.88915 12.9709 6.03132 13.0301C6.17349 13.0894 6.32598 13.1199 6.47999 13.1199C6.63401 13.1199 6.7865 13.0894 6.92866 13.0301C7.07083 12.9709 7.19987 12.8841 7.30833 12.7748C7.52562 12.5562 7.64758 12.2605 7.64758 11.9523C7.64758 11.6441 7.52562 11.3484 7.30833 11.1298L3.17832 6.99977L7.30833 2.86977C7.52562 2.65119 7.64758 2.35549 7.64758 2.04727C7.64758 1.73906 7.52562 1.44336 7.30833 1.22477C7.19931 1.11664 7.07003 1.0311 6.92788 0.973041C6.78574 0.914983 6.63353 0.885553 6.47999 0.886441C6.32645 0.885553 6.17425 0.914983 6.0321 0.973041C5.88996 1.0311 5.76067 1.11664 5.65166 1.22477L0.704992 6.17144C0.595642 6.2799 0.508849 6.40893 0.449619 6.5511C0.390389 6.69327 0.359894 6.84576 0.359894 6.99977C0.359894 7.15379 0.390389 7.30628 0.449619 7.44845C0.508849 7.59062 0.595642 7.71965 0.704992 7.82811Z" fill="black"/>
                                    </svg>
                                </div>
                                <h2 className="mb-0"> Cards Detail </h2>
                            </div>
                            <h6 className="mt-2 col-8 col-xs-4 col-sm-4 col-md-3 col-lg-2 p-2 cursor-pointer bg-gradient d-flex rounded d-justify-center d-align-center text-white" onClick={newCardModalHandler}>Add new card</h6>
                        </div>
                        <div className="d-flex d-flex-wrap pl-3 col-12">
                        {cardsDet.map((item,index)=>{ return <div key={index} className='col-12 col-md-6 mt-4 pr-3'>
                                <div className={`${styless["card-wrapper"]} d-flex d-flex-wrap`}>
                                    <div className="d-flex d-flex-wrap">
                                        <svg id="Layer_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                                            <g><path d="m512 163v-27c0-30.928-25.072-56-56-56h-400c-30.928 0-56 25.072-56 56v27c0 2.761 2.239 5 5 5h502c2.761 0 5-2.239 5-5z"/>
                                            <path d="m0 205v171c0 30.928 25.072 56 56 56h400c30.928 0 56-25.072 56-56v-171c0-2.761-2.239-5-5-5h-502c-2.761 0-5 2.239-5 5zm128 131c0 8.836-7.164 16-16 16h-16c-8.836 0-16-7.164-16-16v-16c0-8.836 7.164-16 16-16h16c8.836 0 16 7.164 16 16z"/></g>
                                        </svg>
                                        <div>
                                            <h5 className="f-600 mb-0 secondary-font">{item.parsed.card_number}</h5>
                                            <h6 className="f-500 mb-0 op-08">Expiry : {item.parsed.card_date}</h6>
                                        </div>
                                    </div>
                                    <div className="bg-gradient p-1 text-white f-500 h6 mb-0 text-center rounded pl-2 pr-2 cursor-pointer" onClick={submitHandler} value={item.cardId}>
                                        pay 
                                    </div>
                                </div>
                                <div className={`${styless["card-wrapper-small"]} d-flex d-flex-wrap`}>
                                    <div className="col-12 d-flex d-flex-wrap d-align-center d-justify-space-between">
                                        <svg id="Layer_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                                            <g><path d="m512 163v-27c0-30.928-25.072-56-56-56h-400c-30.928 0-56 25.072-56 56v27c0 2.761 2.239 5 5 5h502c2.761 0 5-2.239 5-5z"/>
                                            <path d="m0 205v171c0 30.928 25.072 56 56 56h400c30.928 0 56-25.072 56-56v-171c0-2.761-2.239-5-5-5h-502c-2.761 0-5 2.239-5 5zm128 131c0 8.836-7.164 16-16 16h-16c-8.836 0-16-7.164-16-16v-16c0-8.836 7.164-16 16-16h16c8.836 0 16 7.164 16 16z"/></g>
                                        </svg>
                                        <div className="bg-gradient p-1 text-white f-500 font-14 text-center rounded pl-4 pr-4 cursor-pointer" onClick={submitHandler} value={item.cardId}>
                                            pay 
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <h5 className="f-600 mb-0 secondary-font">{item.parsed.card_number}</h5>
                                        <h6 className="f-500 mb-0 op-08">Expiry : {item.parsed.card_date}</h6>
                                    </div>
                                    
                                </div>
                            </div>
                        })}
                        </div>
                    </div>
                </>}
                <ToastContainer
                    toastClassName={styles["toaster-message"]}
                    position={'top-right'}
                    hideProgressBar={false}
                    closeOnClick={true}
                    draggable={true}
                ></ToastContainer>
                {loading && <Loader/>}
                {voucher && <VoucherModal handler={voucherHandler} addCoupon={addCouponHandler}></VoucherModal>}
                {newCardModal && <NewCardModal handler={newCardModalHandler} cardsHandler={cardsListHandler}/>}
                {loginInstruction && <LoginInstruction/>}
                {verifySuccessModal && <VerifySuccess title="Congratulations" subtitle={`You successfully completed your booking for ${data.title} event. Check your mail for booking details`} button="View Ticket" handler={successToBookingPageHandler}/>}
            </>
        )
    }
}
export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}