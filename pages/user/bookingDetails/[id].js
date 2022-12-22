import { useEffect,useState,useRef } from "react";
import styless from "../../../modules/css/header.module.css";
import styles from "../../../modules/css/eventdetails.module.css";
import part from "../../../modules/css/organizer.module.css";
import Upload from "../../../icons/upload";
import Circle from "../../../modules/circle";
import Date from "../../../icons/Date";
import { getOnBoardFromCookie,getUserFromCookie,getOnBoardUserFromCookie,removePaymentDetailCookie } from "../../../auth/userCookies";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import Loader from "../../../modules/Loader";
import Moment from "react-moment";
import {Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import CardArrow from '../../../icons/cardArrow';
import Cards from "../../../modules/Cards";
import { Router} from 'next/router'
export default function BookingDetail() {
  const queryRef = useRef(false);
  const swiperRef = useRef(null);
  const swiperNext = useRef(null);
  const swiperPrev = useRef(null);
  const router = useRouter();
  const user = getOnBoardUserFromCookie();
  const [data,setData] = useState(null);
  const [cancelTicket,setCancelTicket] = useState(false);
  const [cancelSuccess,setCancelSuccess] = useState(false);
  const currency = user.currency;
  const [name,setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading,setLoading] = useState(false)
  const [similar, setSimilar] = useState(null)
  const [eventId, setEventId] = useState(null);
    const onSwiperPrev = () =>{
        swiperRef.current.swiper.slidePrev();
    }
    const onSwiperNext = () => swiperRef.current.swiper.slideNext();
    const ticketCancelHandler = () =>{
        setCancelTicket(prev => !prev);
    }
    const cancelSuccessHandler = (e) =>{
        setCancelTicket(false);
        setCancelSuccess(prev => !prev);
        e.preventDefault();
    }
    const shareHandler = () => {
        document.getElementById("shareicon").classList.toggle("share")
    }
    useEffect(()=>{
        setEventId(router.query["id"]);
        const token = getOnBoardFromCookie();
        let event = '';
    },[eventId])
    useEffect(()=>{
        setEventId(router.query["id"]);
        removePaymentDetailCookie();
        const token = getOnBoardFromCookie();
        let event = '';
        const id = router.query["id"];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/booking/"+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result.booking)
            if(result.booking.isForOther){
                setName(result.booking.separateDetails.name);
                setEmail(result.booking.separateDetails.email);
            }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/event/list?event="+result.booking.event._id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setSimilar(result.events)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
            
        
        document.getElementById("header").classList.add(styless["fixed-header"]);
    },[router.query["id"]])
    if(!data || !similar){
        return <Loader/>
    }
    return (
        <div className="container">
            <div className="d-flex d-flex-wrap mb-75 bg-white rounded-20 p-5">
                <div className={`col-12 col-md-7  mb-5 ${styles["event__details"]}`}>
                    <span className="f-500 font-32 l-40 col-12">Payment Confirmation</span>
                    <div className="col-12 mt-5 d-flex d-flex-wrap d-justify-space-between l-45">
                        <div className="col-12 d-flex d-flex-wrap">
                            <div className="col-12 mb-1 d-flex d-flex-wrap ">
                                <span className={`col-10 col-sm-8 col-md-8 font-36 l-45 text-gradient  f-700 ${styles[""]}`}>
                                    {data.event.title}
                                </span>
                            </div>
                            <span className="col-12 font-14 l-18 text-light-grey "> 
                                {data.event.description}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex d-flex-wrap d-align-center mt-4">
                        <h4 className={`${styles["event__price"]} l-23 f-600`}>{currency == "USD"?"$":"TT$"} {data.totalAmount.toFixed(2)}</h4>
                    </div>
                    <div className="d-flex d-flex-wrap">
                        <div  className={`col-12 col-sm-6 col-md-6 col-lg-6 d-flex d-flex-wrap d-align-center ${styles["event__venue_details"]}`}>
                            <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                <Date></Date>
                            </div>
                            <div className="pl-2 d-flex d-flex-column popin-font">
                                <span className={`${styles["event__venue_1"]} font-14 f-500 text-primary`}>
                                    <Moment utc format="dddd MMMM D">{data.slot.startDateTime}</Moment>
                                </span>
                                <span className={`${styles["event__venue_2"]} font-14 f-500`}>
                                    <Moment utc format="hh:mm A" >{data.slot.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{data.slot.endDateTime}</Moment>
                                </span>
                            </div>
                        </div>
                        <div className={`col-12 col-sm-6 col-md-6 col-lg-6 d-flex d-flex-wrap d-align-center ${styles["event__venue_details"]}`}>
                            <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                <img src="/images/venue.png"/>
                            </div>
                            <div className="pl-2 d-flex d-flex-wrap popin-font">
                                <span className={`${styles["event__venue_1"]} col-12 font-14 f-500 text-primary`}>
                                    Venue
                                </span>
                                <span className={`${styles["event__venue_2"]} col-12 font-14 f-500`}>
                                    {data.event.venue}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex d-align-center mt-5">
                        <img src={data.event.partner.imageUrl} className={`${part["orgazier__avatar"]}`} />
                        <h5 className="m-0 tex-secondary f-500 l-24">
                            {data.event.partner.name}
                        </h5>
                    </div>
                </div>
                <div className={`col-12 col-md-4 offset-md-1 p-relative`}>
                    <Swiper 
                        ref={swiperRef}
                        slidesPerView={1}
                        spaceBetween={30}
                    >
                        <div className={`${styles["swiper__slider-button-left"]}`} onClick={onSwiperPrev} ref={swiperPrev}>
                            <CardArrow></CardArrow>
                        </div>
                        <div className={styles["swiper__slider-button-right"]} onClick={onSwiperNext} ref={swiperNext}>
                            <CardArrow></CardArrow>
                        </div>
                        {data.tickets.map((item,index) =>{ return <SwiperSlide key={index}>
                            <div className={`col-12  bg-light  rounded-20 p-2 pt-5 pb-5`}>
                                <div className="d-flex  d-align-center d-justify-space-between">
                                    <span className="font-20 l-24 f-600 text-gradient pr-4">{data.event.title}</span>
                                    <QRCode  
                                        value={`${data._id},${item._id}`}
                                        style={{ height: "96px", maxWidth: "96px", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <div className={`d-flex d-align-center col-12 pt-4 pb-4 border-bottom-dashed `}>
                                    <div className="d-flex d-flex-column col-6 d-align-start mr-5">
                                        <span className="font-16 f-400 l-20 text-grey ">Name:</span>
                                        <span className="font-16 f-400 l-20 text-primary">{name}</span>
                                    </div>
                                    <div className="d-flex d-flex-column col-6 text-right word-break">
                                        <span className="font-16 f-400 l-20 text-grey">Email:</span>
                                        <span className="font-16 f-400 l-20 text-primary">{email}</span>
                                    </div>
                                </div> 
                                <div className={`d-flex d-flex-wrap  d-justify-space-between mt-5 ${styles["booking-coder"]}`}>
                                    <div className="col-6 d-flex d-flex-wrap d-align-start">
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Ticket Price</span>
                                        <span className="font-16 f-400 l-25 text-primary">{data.totalAmount.toFixed(2)}</span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Event Date</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary"><Moment utc format="DD/M/Y">{data.slot.startDateTime}</Moment></span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Start time</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary"><Moment utc format="hh:mm A" >{data.slot.startDateTime}</Moment></span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Transaction Id</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary word-break">{data.transactionId}</span>
                                    </div>
                                    <div className="col-6 d-flex d-flex-wrap text-right word-break height-fc">
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Ticket type</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary">{item.type}</span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Venue</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary">{data.event.venue}</span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">End time</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary"><Moment utc format="hh:mm A" >{data.slot.endDateTime}</Moment></span>
                                        <span className="col-12 font-16 f-400 l-25 text-grey">Gate</span>
                                        <span className="col-12 font-16 f-400 l-25 text-primary">--</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>})}
                    </Swiper>
                </div>
            </div>
            {similar.length > 0 && <>
                <span className="font-32 f-600 l-40 text-gradient mt-7 mb-5 pt-3 pb-3 d-flex">Similar Events</span>
                <Cards data={similar}></Cards>
            </>}
        </div>
    )
}
export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}
