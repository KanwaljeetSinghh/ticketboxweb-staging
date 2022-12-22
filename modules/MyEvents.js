import styles from './css/modal.module.css';
import EventModalData from "./EventModalData";
import EventModalDataRequest from './EventModalDataRequest';
import { useState,useRef,useEffect } from 'react';
import { getOnBoardFromCookie } from "../auth/userCookies";
import ModalLoader from './ModalLoader';
export default function MyEvents(props){
    const tabs = useRef(null);
    const subTab = useRef(null);
    const queryRef = useRef(false)
    const token = getOnBoardFromCookie();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tabType,setTabType] = useState('upcoming');
    const [subTabType, setSubTabType] = useState("Pending");
    const [approvedData,setApprovedData] = useState([])
    const tabTypeHandler = (e) => {
        let ele = tabs.current.querySelectorAll("span");
        ele.forEach(item => {
            item.classList.remove(styles.active)
        });
        e.currentTarget.classList.add(styles.active);
        const tabValue= e.currentTarget.getAttribute("value");
        setTabType(e.currentTarget.getAttribute("value"));
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}` );
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if(tabValue == "upcoming" || tabValue == "past")
        {
            setLoading(true)
            fetch(process.env.URL+"/user/booking/list/"+tabValue, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
        else{
            setLoading(true)
            fetch(process.env.URL+"/user/request/list/"+tabValue, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
            .catch(error => console.log('error', error));
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}` );
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/request/list/Approved", requestOptions)
            .then(response => response.json())
            .then(result => {
                setApprovedData(result.requests)
                setLoading(false)
            })
        }
    }
    const subTabTypeHandler = (e) =>{
        let ele = subTab.current.querySelectorAll("span");
        ele.forEach(item => {
            item.classList.remove(styles.on)
        });
        e.currentTarget.classList.add(styles.on)
        setSubTabType(e.currentTarget.getAttribute("type"));
        const tabValue = e.currentTarget.getAttribute("type");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}` );
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/request/list/"+tabValue, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        if(!queryRef.current)
        {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}` );
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/booking/list/"+tabType, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
        queryRef.current = true;
    },[])
    if(data == null){
        return  <div className={styles["data-wrapper"]}><ModalLoader/></div>
    }
    return (
       <>
            {loading && <ModalLoader></ModalLoader>}
            <div className={styles["modalquery-tabs-wrapper"]}>
                <div ref={tabs} className={`d-flex d-flex-wrap bg-smoke d-justify-space-around p-1 gap-1 rounded ${styles["modalquery-tabs"]}`}>
                    <span value="upcoming" className={`cursor-pointer e-tab font-12 l-20 font-600 p-1 pl-3 pr-3 ${styles["active"]}`} onClick={tabTypeHandler}>Upcoming</span>
                    <span value="past" className="cursor-pointer e-tab font-12 l-20 font-600 p-1 pl-3 pr-3" onClick={tabTypeHandler}>Past</span>
                    <span value="Pending"  className="cursor-pointer e-tab font-12 l-20 font-600 p-1 pl-3 pr-3" onClick={tabTypeHandler}>Requested</span>
                </div>
            </div>
            {tabType=="upcoming" && <div className="upcoming-body mt-3" >
                <EventModalData data={data.bookings} color="success" past="no" handler={props.handler}></EventModalData>
            </div>}
            {tabType=="past" && <div className="past-body mt-3">
                <EventModalData data={data.bookings}  color="gradient" past="yes" ></EventModalData>
            </div>}

            {tabType != "upcoming" && tabType != "past" && <div className="request-body mt-3">
                <div className={styles["tabs-wrapper"]}>
                    <div ref={subTab} className={`d-flex d-justify-space-around ${styles["tabs"]}`}>
                        <span type="Pending" className={`s-tab cursor-pointer font-16 l-20 f-600 text-grey ${styles["on"]}`} onClick={subTabTypeHandler}>Pending</span>
                        <span type="Approved" className={`s-tab cursor-pointer font-16 l-20 f-600 text-grey ${approvedData.length > 0 && styles["heading"]} p-relative `} onClick={subTabTypeHandler}>Approved</span>
                        <span type="Rejected" className={`s-tab cursor-pointer font-16 l-20 f-600 text-grey p-relative `} onClick={subTabTypeHandler}>Rejected</span>
                    </div>
                </div>
                {subTabType=="Pending" && <EventModalDataRequest data={data.requests}  color="gradient" pending="block" handler={props.handler}></EventModalDataRequest>}
                {subTabType=="Approved" && <EventModalDataRequest data={data.requests}  color="success" approved="block" handler={props.handler}></EventModalDataRequest>}
                {subTabType=="Rejected" && <EventModalDataRequest data={data.requests}  color="danger" handler={props.handler}></EventModalDataRequest>}

            </div>}

            
        </>
    );

}