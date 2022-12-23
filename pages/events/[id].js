import { useEffect, useState,useRef } from "react";
import Cards from "../../modules/Cards";
import styless from "../../modules/css/header.module.css";
import styles from "../../modules/css/eventdetails.module.css";
import { getOnBoardFromCookie,getOnBoardUserFromCookie } from "../../auth/userCookies";
import EventDetail from "../../modules/EventDetail";
import Organizer from "../../modules/Organizer";
import Location from "../../modules/Location";
import FeaturedTabs from "../../modules/featured-Tabs";
import { Router,useRouter } from "next/router";
import Loader from "../../modules/Loader";
import Circle from "../../modules/circle";
import Upload from "../../icons/upload";
import Moment from 'react-moment';
import Date from "../../icons/Date";
import DropDownCommittee from "../../modules/DropDownCommittee";
import TicketsAdder from "../../modules/TicketsAdder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaDecorator from "../../modules/MetaDecorator";
import Head from "next/head";
import EventRequestModal from "../../modules/EventRequestModal";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton
} from "react-share";
export default function EventDetails(props) {
  const [data, setData] = useState(null)
  const token = getOnBoardFromCookie();
  const queryRef = useRef(null)
  const user = getOnBoardUserFromCookie();
  const router = useRouter();
  let link = router.asPath;
  const [similar, setSimilar] = useState(null)
  const [loading,setLoading] = useState(false)
  const [id,setId] = useState(null);
  const slotRef = useRef(null)
  const ticketsRef = useRef(null);
  const [tickets, setTickets] = useState([]);
  const [slot, setSlot] = useState({
      startDateTime:0,
      endDateTime:0
  });
  const [eventId,setEventId] = useState(null);
  const [committeeMemberId,setCommitteeMemberId] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [reason, setReason] = useState('');
  const [tab,setTab] = useState(0);
  const [addMore, setAddMore] = useState(false);
  //for requesting event successfully
  const [eventRequest,setEventRequest] = useState(false);
  const [notComplimentaryTickets,setNotComplimentaryTickets] = useState([])

  const eventRequestHandler= () =>{
      setEventRequest(prev => !prev);
      router.push(`/user`)
  }
  const tags = [];
  const stars = [];
  for(let i=1;i<=5;i++){
      stars.push(i);
  }
  const slotHandler = (e) => {
      let ele = slotRef.current.querySelectorAll("div");
      ele.forEach(item => {
          item.classList.remove(styles.active);
      });
      e.currentTarget.classList.add(styles.active);
      let obj = {
          "startDateTime": e.currentTarget.getAttribute("start-time"),
          "endDateTime": e.currentTarget.getAttribute("end-time")
      }
      setSlot(obj);
  }
  const setTabHandler = (e) =>{
      setTab(1);
  }
  const ticketCountHandler = (type,cnt=1) =>{
      if(type == "inc"){
          setTicketCount(prev => prev + 1);
      }
      else if(type == "dec"){
          if(ticketCount > 1){
              setTicketCount(prev => prev - 1);
          }
          else{
              toast.error("Count should not be less than 1",{
                  toastId:"em-3"
              })
          }
      }
      else if(type == "change"){
          setTicketCount(0);
      }
      else{
          toast.error("Something went wrong please refresh the page",{
              toastId:"em-3"
          })
      }
  }
  const committeeMemberHandler = (id) =>{
      setCommitteeMemberId(id);
  }
  const reasonHandler = (e) => {
      setReason(e.target.value)
  }
  const validator = () => {
      let res = true;
      let selectedTickets = [];
      ticketsRef.current.querySelectorAll(".ticket_wrapper .tickets-adder-dropdown").forEach(item => {
          let obj = {
              "type": item.getAttribute("ticket-type"),
              "price": item.getAttribute("ticket-price"),
              "count": item.getAttribute("ticket-count")
          }
          selectedTickets.push(obj);
      })
      setTickets(selectedTickets)
      if(ticketCount == 0){
          toast.error("Select ticket from dropdown",{
              toastId:"re-1"
          })
          res = false;
      }
      if(committeeMemberId == null){
          toast.error("Select committeMember from dropdown",{
              toastId:"re-2"
          })
          res = false;
      }
      if(slot.startDateTime == 0 || slot.endDateTime == 0){
          toast.error("Select ticket slot",{
              toastId:"em-1"
          })
          res = false;
      }
      return res;
  }
  const submitHandler = (e) => {
      e.preventDefault();
      let selectedTickets = [];
      if(ticketsRef.current.querySelectorAll(".ticket_wrapper .tickets-adder-dropdown").length > 0){
          ticketsRef.current.querySelectorAll(".ticket_wrapper .tickets-adder-dropdown").forEach(item => {
              if(parseInt(item.getAttribute("ticket-count"))>0){
                  let obj = {
                      "type": item.getAttribute("ticket-type"),
                      "price": item.getAttribute("ticket-price"),
                      "count": item.getAttribute("ticket-count")
                  }
                  selectedTickets.push(obj);
              }
          })
          setTickets(selectedTickets)
      }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      let result = validator();
      if(result){
          var raw = JSON.stringify({
              "event_id": router.query["id"],
              "committeeMember": committeeMemberId,
              "tickets": selectedTickets,
              "slot": slot,
              "reason": reason
          });
          e.preventDefault();
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };
          setLoading(true)
          fetch(process.env.URL+"/user/request/create", requestOptions)
          .then(response => response.json())
          .then(result => {
              if(result.status){
                  setLoading(false)
                  setEventRequest(true)
              }
              else{
                  setLoading(false)
                  toast.error(result.msg,{
                      toastId:"rem-1"
                  })
              }
          })
          .catch(error => console.log(error));
      }
  }
  const shareHandler = () => {
    document.getElementById("shareicon").classList.toggle("share")
  }
  useEffect(()=>{
      if(token){
        const idx = router.query["id"]
        setId(id)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/event/"+idx, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result)
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
        fetch(process.env.URL+"/user/event/list?city=all&event="+idx, requestOptions)
        .then(response => response.json())
        .then(result => {
          setSimilar(result.events)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
      }
      else{
        const idx = router.query["id"]
        setId(id)
        var myHeaders = new Headers();
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/event/"+idx, requestOptions)
        .then(response => response.json())
        .then(result => {
          setData(result)
          if(result.event.slots.length == 1){
              let obj = {
                  "startDateTime": result.event.slots[0].startDateTime,
                  "endDateTime": result.event.slots[0].endDateTime
              }
              setSlot(obj);
          }
        })
        .catch(error => console.log('error', error));
        fetch(process.env.URL+"/event/list?event="+idx, requestOptions)
        .then(response => response.json())
        .then(result => {
          setSimilar(result.events)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
      }
      document.getElementById("header").classList.add(styless["fixed-header"]);
  },[router.query["id"]])
  if(!data || !similar){
    return <Loader/>
  }
  return (
    <>
      <Head>
        <title>{data.event.title}</title>
        <meta name="description" content={data.event.description}/>
        <meta property="og:title" content={data.event.title}/>
        <meta property="og:description" content={data.event.description}/>
        <meta property="og:image" content={data.event.thumbnail}/>
        <meta property="og:url" content={"https://ticketboxonline.com"+ window.location.pathname + window.location.search}/>
        <meta name="twitter:image:alt" content={data.event.title}/>
      </Head>
      <div className={`container bg-white rounded-20 p-5 `}>
        {tab == 0 && <><EventDetail title="Book" data={data.event} handler={setTabHandler}></EventDetail>
        <div className="d-flex d-flex-wrap">
          <div className='col-12 col-md-6 d-flex d-flex-wrap'>
            <Organizer data={data.event}></Organizer>
          </div>
          <div className='col-12 col-md-5 offset-md-1'>
            <Location data={data.event.location}></Location>
          </div>
          <div>
            <span className="font-32 l-40 f-700 mt-2 mb-3 d-flex">Tags</span>
            <FeaturedTabs classes="large" data={data.event.tags}></FeaturedTabs>
          </div>
        </div></>}
        {tab == 1 &&
            <>
                <form onSubmit={submitHandler} className="d-flex d-flex-wrap bg-white rounded-20 ">
                    <div className={`col-12 col-lg-7 pt-5 d-flex d-flex-wrap ${styles["request__event__detail"]}`}>
                        <div className="d-flex d-flex-wrap d-align-center">
                            <div className="cursor-pointer mr-3" onClick={e => setTab(0)}>
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.704992 7.82811L5.65166 12.7748C5.76012 12.8841 5.88915 12.9709 6.03132 13.0301C6.17349 13.0894 6.32598 13.1199 6.47999 13.1199C6.63401 13.1199 6.7865 13.0894 6.92866 13.0301C7.07083 12.9709 7.19987 12.8841 7.30833 12.7748C7.52562 12.5562 7.64758 12.2605 7.64758 11.9523C7.64758 11.6441 7.52562 11.3484 7.30833 11.1298L3.17832 6.99977L7.30833 2.86977C7.52562 2.65119 7.64758 2.35549 7.64758 2.04727C7.64758 1.73906 7.52562 1.44336 7.30833 1.22477C7.19931 1.11664 7.07003 1.0311 6.92788 0.973041C6.78574 0.914983 6.63353 0.885553 6.47999 0.886441C6.32645 0.885553 6.17425 0.914983 6.0321 0.973041C5.88996 1.0311 5.76067 1.11664 5.65166 1.22477L0.704992 6.17144C0.595642 6.2799 0.508849 6.40893 0.449619 6.5511C0.390389 6.69327 0.359894 6.84576 0.359894 6.99977C0.359894 7.15379 0.390389 7.30628 0.449619 7.44845C0.508849 7.59062 0.595642 7.71965 0.704992 7.82811Z" fill="black"/>
                                </svg>
                            </div>
                            <h2 className="f-500 l-27 mb-0 d-flex">Request An Event</h2>
                        </div>
                        
                        {/* <div className="d-flex d-align-center d-justify-space-between d-flex-wrap col-12 mt-2">
                            <FeaturedTabs classes="small" data={data.event.tags}></FeaturedTabs>
                            <Circle>
                                <a className={`tooltip mt-1`} id="shareicon">
                                    <span className="tooltiptext" id="myTooltip">fb insta</span>
                                    <div onClick={shareHandler}>
                                        <Upload/>
                                    </div>
                                </a>
                            </Circle>
                        </div> */}
                        <div className="col-12 mb-1 mt-3 d-flex d-flex-wrap d-align-center d-justify-space-between">
                            <span className={`col-12 col-sm-8 col-md-8 font-36 l-45 text-gradient  f-700 ${styles["event__title"]}`}>
                                {data.event.title}
                            </span>
                            <div className={`d-flex col-12 col-sm-4 col-md-4 d-flex-wrap d-align-center d-justify-end ${styles["event-detail-icons"]}`}>
                                <svg  width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z" fill="#FFC700" stroke="#FFC700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="font-14 pl-1 pr-2 l-18 text-light-grey">{data.event.partner.ratingsAverage.$numberDecimal}</span>
                                <Circle>
                                    <div className={`tooltip`} id="shareicon">
                                        <span className="tooltiptext d-flex d-justify-center" id="myTooltip">
                                            <WhatsappShareButton
                                                title={data.event.title+" Event"}
                                                url={`https://ticketboxonline.com/${link}`}
                                                
                                            >
                                                <svg height="512" viewBox="0 0 176 176" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_09.whatsapp" data-name="09.whatsapp"><circle id="background" cx="88" cy="88" fill="#29a71a" r="88"/><g id="icon" fill="#fff"><path d="m126.8 49.2a54.57 54.57 0 0 0 -87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53a54.56 54.56 0 0 0 63.09-87.21zm-8.59 68.56a42.74 42.74 0 0 1 -49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1 -.22 60.19z"/><path d="m116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15c-12.09-11.21-15.23-20.54-14.47-27.94.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1 -.49 4l-2.25 2.92a3.87 3.87 0 0 0 -.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z"/></g></g></g></svg>
                                            </WhatsappShareButton>
                                            <FacebookShareButton
                                                quote={data.event.title+" Event"}
                                                url={`https://ticketboxonline.com${link}`}
                                                hashtags={tags}
                                                
                                            >
                                                <svg id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m512 256c0 127.78-93.62 233.69-216 252.89v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.38-19.2-216-125.11-216-252.89 0-141.38 114.62-256 256-256s256 114.62 256 256z" fill="#1877f2"/><path d="m355.65 330 11.35-74h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979h32.281v-63s-29.296-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111v-178.889z" fill="#fff"/></g></svg>  
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                title={data.event.title+" Event"}
                                                url={`https://ticketboxonline.com${link}`}
                                                hashtags={tags}
                                                
                                            >
                                                <svg height="512" viewBox="0 0 152 152" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="Color"><g id="_04.Twitter" data-name="04.Twitter"><circle id="Background" cx="76" cy="76" fill="#03a9f4" r="76"/><path id="Icon" d="m125.23 45.47a42 42 0 0 1 -11.63 3.19 20.06 20.06 0 0 0 8.88-11.16 40.32 40.32 0 0 1 -12.8 4.89 20.18 20.18 0 0 0 -34.92 13.8 20.87 20.87 0 0 0 .47 4.6 57.16 57.16 0 0 1 -41.61-21.11 20.2 20.2 0 0 0 6.21 27 19.92 19.92 0 0 1 -9.12-2.49v.22a20.28 20.28 0 0 0 16.17 19.82 20.13 20.13 0 0 1 -5.29.66 18 18 0 0 1 -3.83-.34 20.39 20.39 0 0 0 18.87 14.06 40.59 40.59 0 0 1 -25 8.61 36.45 36.45 0 0 1 -4.83-.28 56.79 56.79 0 0 0 31 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.16 40.16 0 0 0 10.04-10.48z" fill="#fff"/></g></g></g></svg>  
                                            </TwitterShareButton>
                                            {/* <FacebookMessengerShareButton
                                                title={data.event.title}
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
                        <div className="d-flex d-flex-wrap d-align-center mt-4 col-12">
                            <h4 className={`font-18 f-600 l-23 f-600`}>{user.currency == "USD"?"$":"TT$"} {data.event.tickets[0].price.toFixed(2)}</h4>
                        </div>
                        <div className={`mt-2 col-12 col-sm-6 col-lg-6 d-flex d-flex-wrap d-align-center `}>
                            <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                <img src="/images/venue.png"/>
                            </div>
                            <div className="d-flex d-flex-column popin-font pl-2">
                                <span className={`font-14 f-500 text-primary ${styles["event__venue_1"]}`}>
                                    Venue 
                                </span>
                                <span className={`font-14 f-500 text-primary ${styles["event__venue_2"]}`}>
                                    {data.event.venue}
                                </span>
                            </div>
                        </div>
                        <div className={`mt-2 col-12 col-sm-6 col-sm-4 col-lg-6 d-flex d-flex-wrap d-align-center `}>
                            <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                {data.event.type == "Physical" && <img src="/images/location.png"/>}
                                {data.event.type == "Virtual" && <img src="/images/computer.png"/>}
                            </div>
                            <div className="d-flex d-flex-column popin-font pl-2">
                                <span className={`font-14 f-500 text-primary ${styles["event__venue_1"]}`}>
                                    {data.event.type} Event
                                </span>
                                <span className={`font-14 f-500 text-primary ${styles["event__venue_2"]}`}>
                                    {data.event.location.city}
                                </span>
                            </div>
                        </div>
                        <label className="mt-3 col-12">Select Time</label>
                        <div ref={slotRef} className={`d-flex d-flex-wrap col-12 ${styles["slots-wrapper"]} mt-2`}>
                            {data.event.slots.map((item,index)=>{return <div className={`d-flex d-flex-wrap d-align-center  ${styles["event__slots"]} ${data.event.slots.length == 1 ? styles["active"]:""}`}  onClick={slotHandler} key={index} start-time={item.startDateTime} end-time={item.endDateTime}>
                                    <div className={`d-flex d-align-center d-justify-center  ${styles["event__venue_svg"]}`}>
                                        <Date/>
                                    </div>
                                    <div className="d-flex d-flex-column popin-font pl-2">
                                        <span className={` font-14 f-500  ${styles["event__venue_1"]}`}>
                                            <Moment utc format="dddd MMMM D">{item.startDateTime}</Moment>                                            
                                        </span>
                                        <span className={` font-14 f-500 text-gradient ${styles["event__venue_2"]}`}>
                                            <Moment utc format="hh:mm A" >{item.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{item.endDateTime}</Moment> IST
                                        </span>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    
                    <div ref={ticketsRef} className={`col-12 col-md-8 col-lg-4 offset-lg-1 d-flex d-flex-column ${styles["request__event"]}`}>
                        <label>Select Committee Member</label>
                        <DropDownCommittee color="#EEE" placeholder="Select" data={data.event.committeeMembers} handler={committeeMemberHandler}></DropDownCommittee>
                        <label>Ticket type & price</label>
                        <div className="col-12 mt-1">
                            <TicketsAdder data={notComplimentaryTickets} index="0" count={ticketCount} handler={ticketCountHandler}></TicketsAdder>
                        </div>
                        {addMore && data.event.tickets.map((item,index) => {
                            if(index!=0) return ( <div className="col-12">
                                <TicketsAdder data={notComplimentaryTickets} index={index} count={ticketCount} handler={ticketCountHandler}></TicketsAdder>
                            </div>
                            )
                        })}
                        {!addMore && <span className="col-12 text-right text-primary" >
                            <span className="cursor-pointer user-select-none" onClick={()=>{setAddMore(true)}}>
                                + Add more
                            </span>
                        </span>}
                        <label>Leave a note (optional)</label>
                        <textarea rows="3" placeholder="Enter your note" value={reason} onChange={reasonHandler}></textarea>
                       
                        <button type="submit" className="cursor-pointer border-none mt-5 btn btn-primary btn-default-width" >Request Events</button>
                        
                    </div>
                    <div className="mt-3">
                        <span className="font-32 l-40 f-700 mb-3 d-flex">Tags</span>
                        <FeaturedTabs classes="large" data={data.event.tags}></FeaturedTabs>
                    </div>
                </form>
            </>}
      </div>
      {similar.length != 0 && <div className="container">
        <div className="col-12 mt-5">
          <h2 className="mb-4 pt-5 letter-spacing-3 f-700 l-40 text-secondary">Similar Events</h2>
        </div>
        <Cards data={similar}></Cards>
      </div>}
      {loading && <Loader/>}
      {eventRequest && <EventRequestModal handler={eventRequestHandler}  title="submitted "></EventRequestModal>}
      <ToastContainer
            toastClassName={styles["toaster-message"]}
            position={'top-right'}
            hideProgressBar={false}
            closeOnClick={true}
            draggable={true}
        ></ToastContainer>
    </>
  )
}
export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
      };
}