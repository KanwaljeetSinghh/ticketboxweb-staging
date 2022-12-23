import styles from "./css/eventdetails.module.css";
import FeaturedTabs from "../modules/featured-Tabs";
import Upload from "../icons/upload";
import Date from "../icons/Date";
import Circle from "./circle";
import { useEffect, useState } from "react";
import { getOnBoardFromCookie,getOnBoardUserFromCookie } from "../auth/userCookies";
import { useRouter } from "next/router";
import Moment from 'react-moment';
import LoginModal from "./Login-Modal";
import LoginInstruction from "./loginInstruction";
import ForgotPassword from "./ForgotPassword";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton
} from "react-share";
function EventDetail(props){
    const token = getOnBoardFromCookie();
    const user = getOnBoardUserFromCookie();
    const router = useRouter();
    const [eventId, setEventId] = useState("");
    const [loginModal, setLoginModal] = useState(false);
    const [loginInstruction, setLoginInstruction] = useState(false)
    const [ForgotPasswordModal,setForgotPasswordModal] = useState(false);
    const tags = [];
    const stars = [];
    const [showMoreLess,setShowMoreLess] = useState(false)
    let link = router.asPath;
    for(let i=1;i<=5;i++){
        stars.push(i);
    }
    const bookToPaymentHandler = () => {
        if(token != null){
            router.push(`/user/payment/${eventId}`)
        }
        else{
            setLoginInstruction(prev => !prev)
        }
    }
    const requestToPaymentHandler = () => {
        if(token != null){
            props.handler();
        }
        else{
            setLoginInstruction(prev => !prev)
        }
    }
    const LoginModalHandler = () => {
        setLoginModal(prev => !prev)
        setLoginInstruction(false)
    }
    const shareHandler = () => {
        document.getElementById("shareicon").classList.toggle("share")
    }
    const ForgotPasswordModalHandler = () => {
        setForgotPasswordModal(prev => !prev)
        setLoginModal(false)
    }
    useEffect(()=>{
        setEventId(props.data._id);
        props.data.tags.map(item=>{
            tags.push(item.name)
        })
        
    });
    return (
        <div className="container d-flex d-flex-wrap col-12">
            <div className={`col-12 col-lg-5 ${styles["image__section"]}`}>
                <img src={`${props.data.thumbnail}`} alt={`Image Thumbnail of ${props.data.title}`} />
            </div>
            <div className={`col-12 col-lg-6 offset-lg-1 ${styles["event__details"]}`}>
                <div className="col-12 d-flex d-flex-wrap d-justify-space-between l-45">
                    <div className="col-12 d-flex d-flex-wrap">
                        <div className="col-12 mb-1 d-flex d-flex-wrap d-align-center d-justify-space-between">
                            <span className={`col-12 col-sm-8 col-md-8 font-36 l-45 text-gradient  f-700 ${styles["event__title"]}`}>
                                {props.data.title}
                            </span>
                            <div className={`d-flex col-11 col-sm-3 col-md-3 d-flex-wrap d-align-center d-justify-end ${styles["event-detail-icons"]}`}>
                                <div className={`col-12 col-lg-12 d-flex d-justify-end d-align-center`}>
                                    <svg  width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z" fill="#FFC700" stroke="#FFC700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="font-14 pl-1 pr-2 l-18 text-light-grey">{props.data.partner.ratingsAverage.$numberDecimal}</span>
                                    <Circle>
                                        <div className={`tooltip`} id="shareicon">
                                            <span className="tooltiptext d-flex d-justify-center d-align-center" id="myTooltip">
                                                <WhatsappShareButton
                                                    title={props.data.title+" Event"}
                                                    url={`https://ticketboxonline.com/${link}`}
                                                    style={{
                                                        display:"flex",
                                                        alignItems:"center"
                                                    }}
                                                >
                                                   <svg height="512" viewBox="0 0 176 176" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_09.whatsapp" data-name="09.whatsapp"><circle id="background" cx="88" cy="88" fill="#29a71a" r="88"/><g id="icon" fill="#fff"><path d="m126.8 49.2a54.57 54.57 0 0 0 -87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53a54.56 54.56 0 0 0 63.09-87.21zm-8.59 68.56a42.74 42.74 0 0 1 -49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1 -.22 60.19z"/><path d="m116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15c-12.09-11.21-15.23-20.54-14.47-27.94.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1 -.49 4l-2.25 2.92a3.87 3.87 0 0 0 -.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z"/></g></g></g></svg>
                                                </WhatsappShareButton>
                                                <FacebookShareButton
                                                
                                                    quote={props.data.title}
                                                    url={`https://ticketboxonline.com${link}`}
                                                    hashtags={tags}
                                                    style={{
                                                        display:"flex",
                                                        alignItems:"center"
                                                    }}
                                                >
                                                    <svg id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m512 256c0 127.78-93.62 233.69-216 252.89v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.38-19.2-216-125.11-216-252.89 0-141.38 114.62-256 256-256s256 114.62 256 256z" fill="#1877f2"/><path d="m355.65 330 11.35-74h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979h32.281v-63s-29.296-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111v-178.889z" fill="#fff"/></g></svg>  
                                                </FacebookShareButton>
                                                <TwitterShareButton
                                                    title={props.data.title+" Event"}
                                                    url={`https://ticketboxonline.com${link}`}
                                                    hashtags={tags}
                                                    style={{
                                                        display:"flex",
                                                        alignItems:"center"
                                                    }}
                                                >
                                                    <svg height="512" viewBox="0 0 152 152" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="Color"><g id="_04.Twitter" data-name="04.Twitter"><circle id="Background" cx="76" cy="76" fill="#03a9f4" r="76"/><path id="Icon" d="m125.23 45.47a42 42 0 0 1 -11.63 3.19 20.06 20.06 0 0 0 8.88-11.16 40.32 40.32 0 0 1 -12.8 4.89 20.18 20.18 0 0 0 -34.92 13.8 20.87 20.87 0 0 0 .47 4.6 57.16 57.16 0 0 1 -41.61-21.11 20.2 20.2 0 0 0 6.21 27 19.92 19.92 0 0 1 -9.12-2.49v.22a20.28 20.28 0 0 0 16.17 19.82 20.13 20.13 0 0 1 -5.29.66 18 18 0 0 1 -3.83-.34 20.39 20.39 0 0 0 18.87 14.06 40.59 40.59 0 0 1 -25 8.61 36.45 36.45 0 0 1 -4.83-.28 56.79 56.79 0 0 0 31 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.16 40.16 0 0 0 10.04-10.48z" fill="#fff"/></g></g></g></svg>  
                                                </TwitterShareButton>
                                                {/* <FacebookMessengerShareButton
                                                    title={props.data.title}
                                                    url={`https://ticketboxonline.com${link}`}
                                                    style={{
                                                        display:"flex",
                                                        alignItems:"center"
                                                    }}
                                                    appId={111151224257326}
                                                >
                                                    <svg height="512" viewBox="0 0 176 176" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_06.messenger" data-name="06.messenger"><circle id="background" cx="88" cy="88" fill="#0084ff" r="88"/><g id="icon"><path d="m143 85.93c0 28.13-24.63 50.93-55 50.93a59.23 59.23 0 0 1 -15.78-2.13l-18.73 10.27v-19.42c-12.49-9.33-20.49-23.58-20.49-39.65 0-28.13 24.63-50.93 55-50.93s55 22.81 55 50.93z" fill="#fff"/><path d="m123.53 71.67-30.07 31.9-14-14.93-27.33 14.94 30.07-31.91 14.35 14.93z" fill="#2196f3"/></g></g></g></svg>   
                                                </FacebookMessengerShareButton> */}
                                            </span>
                                            <div onClick={shareHandler} className="cursor-pinter">
                                                <Upload/>
                                            </div>
                                        </div>
                                    </Circle>
                                </div>
                            </div>
                        </div>
                        <span className="col-12 font-14  text-light-grey " style={{whiteSpace:"pre-line",lineHeight:"16px"}}> 
                            {showMoreLess ? props.data.description : (props.data.description).substr(0,100)} 
                            {(props.data.description).length > 100 && <span className="text-primary cursor-pointer ml-1" onClick={e => setShowMoreLess(prev=>!prev)}>{showMoreLess?"Read less.":"...Read more."}</span>} 
                        </span>
                    </div>
                </div>
                <div className="d-flex d-flex-wrap d-align-center mt-4">
                    <h4 className={`${styles["event__price"]} l-23 f-600`}>{user.currency == "USD"?"$ "+props.data.tickets[0].price.toFixed(2):"TT$ "+(props.data.tickets[0].price*user.rate).toFixed(2)}</h4>
                </div>
                <div className="d-flex d-flex-wrap">
                    {props.data.slots && props.data.slots.length > 0 && props.data.slots.map((item,index)=>{ return( 
                        <div key={index} className={`col-12 col-sm-6 col-md-4 col-lg-6 d-flex d-flex-wrap d-align-center ${styles["event__venue_details"]}`}>
                            <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                <Date></Date>
                            </div>
                            <div className=" d-flex d-flex-column popin-font pl-2">
                                <span className={`${styles["event__venue_1"]} font-14 f-500 text-primary`}>
                                    <Moment utc format="dddd MMMM D">{item.startDateTime}</Moment>
                                </span>
                                <span className={`${styles["event__venue_2"]} font-14 f-500`}>
                                    <Moment utc format="hh:mm A" >{item.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{item.endDateTime}</Moment> IST
                                </span>
                            </div>
                        </div>
                    )
                    })
                    }
                    <div className={`col-12 col-sm-6 col-md-4 col-lg-6 d-flex d-flex-wrap d-align-center ${styles["event__venue_details"]}`}>
                        <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                            <img src="/images/location.png"/>
                        </div>
                        <div className="col-10 d-flex d-flex-wrap popin-font pl-2">
                            <span className={`${styles["event__venue_1"]} col-12 font-14 f-500 text-primary`}>
                                Venue
                            </span>
                            <span className={`${styles["event__venue_2"]} col-12 font-14 f-500`}>
                               {props.data.venue}
                            </span>
                        </div>
                    </div>
                    <div className={`col-12 col-sm-6 d-flex d-flex-wrap  ${styles["event__venue_details"]}`}>
                        <div className={`d-flex d-align-center height-fc mt-2 d-justify-center  ${styles["event__venue_svg"]}`}>
                            <img src="/images/venue.png"/>
                        </div>
                        <div className="col-10 d-flex d-flex-column popin-font pl-2">
                            <span className={`${styles["event__venue_1"]} font-14 f-500 text-primary`}>
                                {props.data.type} 
                            </span>
                            <span className={`${styles["event__venue_2"]} font-14 f-500`}>
                                {props.data.location.city} {props.data.location.address}
                            </span>
                        </div>
                    </div>
                </div>
                {props.data.isRequestBased?
                    <div className="col-12 d-flex ">
                        <span role="button" className={`btn btn-primary btn-default-width cursor-pointer mt-4 ${styles["event-detail-button"]}`} onClick={requestToPaymentHandler}>Request Event</span>
                    </div>
                    :
                    <div className="col-12 d-flex">
                        <span role="button" className={`btn cursor-pointer btn-primary btn-default-width mt-4 ${styles["event-detail-button"]}`} onClick={bookToPaymentHandler}>Book Event</span>
                    </div>
                }
                {ForgotPasswordModal && <ForgotPassword handler={ForgotPasswordModalHandler} />}
                {loginModal && <LoginModal handler={LoginModalHandler} forgot={ForgotPasswordModalHandler}/>}
                {loginInstruction && <LoginInstruction handler={bookToPaymentHandler} login={LoginModalHandler}/>}
            </div>
        </div>
    )
}

export default EventDetail;