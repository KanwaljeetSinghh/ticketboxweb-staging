import { useEffect,useRef } from "react";
import Cards from "../modules/Cards";
import styless from "../modules/css/header.module.css";
import styles from "../modules/css/filter.module.css";
import StarSmall from "../icons/Star-small";
import SectionHeading from "../modules/Section-Heading";
import RangeSlider from "../modules/RangeSlider";
import DropDown from "../modules/DropDown";
import { useState } from "react";
import { useRouter,Router } from "next/router";
import Loader from "../modules/Loader";
export default function Filters() {
    const router = useRouter();
    const ratingRef = useRef();
    const [rating,setRating] = useState(null);
    const [city,setCity] = useState([]);
    const [tags, setTags] = useState([]);
    const [freeEvent,setFreeEvent] = useState(0);
    const [requestEvent,setRequestEvent] = useState(0);
    const [eventType,setEventType] = useState(null);
    const [eventName,setEventName] = useState("");
    const [location,setLocation] = useState("all");
    const [minValue, setMinVal] = useState(0);
    const [maxValue,setMaxVal] = useState(2000);
    const [loading, setLoading] = useState(false);
    const minValueHandler = (min) => {
        setMinVal(min)
    }
    const maxValuehandler = (max) => {
        setMaxVal(max)
    }
    const eventTypeHandler = (id,val) => {
        setEventType(id);
        setEventName(val);
    }
    const locationHandler = (id,val) => {
        setLocation(val);
    }
    const ratingHandler = (e) => {
        const ele = ratingRef.current.querySelectorAll("div");
        ele.forEach((item)=>{
            item.classList.remove(styles.active);
        });
        e.currentTarget.classList.add(styles.active);
        setRating(e.currentTarget.getAttribute("value"))
    }
    const requestEventHandler = (e) => {
        setRequestEvent(prev => !prev);
    }
    const freeEventHandler = (e) => {
        setFreeEvent(prev => !prev);
    }
    const submitHandler = (e) => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const query = "";
        if(location != null){
            query = query + `city=${location}`;
        }
        else{
            query = query + `?city=all`;
        }
        if(eventType != null){
            query = query + `&tag=${eventType}&tagName=${eventName}`;
        }
        if(minValue => 0){
            query = query + `&minPrice=${minValue}`;
        }
        if(maxValue => 0){
            query = query + `&maxPrice=${maxValue}`;
        }
        if(requestEvent == 1){
            query = query + `&RequestEvent=1`;
        }
        if(freeEvent == 1){
            query = query + `&RequestEvent=0`;
        }
        if(rating != null){
            query = query + `&rating=${rating}`;
        }
        setLoading(true)
        e.preventDefault();
        router.push(`/filterResult?${query}`)
    }
    useEffect(()=>{
        document.getElementById("header").classList.add(styless["fixed-header"]);
        setLoading(true);
        fetch(process.env.URL+"/admin/tag/list").then(res => res.json()).then(res => setTags(res.tags));
        fetch(process.env.URL+"/admin/city/list").then(result => result.json()).then(result => setCity(result.cities));
        setLoading(false)
    },[])
    return (
        <div className={`container `}>    
        {loading && <Loader></Loader>}
            <form onSubmit={submitHandler}>
                <div className={`bg-white rounded-20 p-5 mb-75 ${styles["filters"]}`}>
                    <h2 className="f-600 l-40 mb-5">Add Filters</h2>
                    <div className="d-flex d-flex-wrap d-justify-space-between">
                        <div className="col-12 col-sm-5 col-lg-3 d-flex d-flex-column mt-3">
                            <label>Pricing</label>
                            <RangeSlider classes="mt-4" marker="true" labels="true" min="0" max="2000" minHandler={minValueHandler} maxHandler={maxValuehandler}></RangeSlider>
                            <div className="d-flex d-flex-wrap d-align-center d-justify-space-between mt-5">
                                <div className="d-flex d-align-center ">
                                    <input type="radio" id="free" name="group" value="FreeEvent" onClick={freeEventHandler}></input>
                                    <label className="font-16 f-400 l-24 text-grey ml-1" htmlFor="free">Public events</label>
                                </div>
                                <div className="d-flex d-align-center">
                                    <input type="radio" id="requested" name="group" value="RequestEvent" onClick={requestEventHandler}></input>
                                    <label className="font-16 f-400 l-24 text-grey ml-1" htmlFor="requested">Requested events</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mt-3 d-flex d-flex-column d-justify-space-between ">
                            <div className="d-flex d-flex-column">
                                <label>Event type</label>
                                <DropDown placeholder="Select Event" color="whitesmoke" data={tags}  handler={eventTypeHandler}></DropDown>
                            </div>
                            <div className="d-flex d-flex-column mt-2">
                                <label >Location</label>
                                <DropDown placeholder="Select City" color="whitesmoke" data={city} handler={locationHandler}></DropDown>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-4 mt-3 d-flex d-flex-column d-justify-space-between d-align-center">
                            <div className="col-12 d-flex d-flex-column d-align-start">
                                <label>Ratings</label>
                                <div ref={ratingRef} className="d-flex d-flex-wrap gap-2">
                                    <div className={`d-flex d-align-center gap-1 pr-1 pl-1 rounded border d-justify-space-between ${styles["ratings"]}`} onClick={ratingHandler} value="1">
                                        <StarSmall color="#525257"></StarSmall>
                                        <span className="font-14 f-500 l-20">1+</span>
                                    </div>
                                    <div className={`d-flex d-align-center gap-1 pr-1 pl-1 rounded border d-justify-space-between ${styles["ratings"]}`} onClick={ratingHandler} value="2">
                                        <StarSmall color="#525257"></StarSmall>
                                        <span className="font-14 f-500 l-20">2+</span>
                                    </div>
                                    <div className={`d-flex d-align-center gap-1 pr-1 pl-1 rounded border d-justify-space-between ${styles["ratings"]}`} onClick={ratingHandler} value="3">
                                        <StarSmall color="#525257"></StarSmall>
                                        <span className="font-14 f-500 l-20">3+</span>
                                    </div>
                                    <div className={`d-flex d-align-center gap-1 pr-1 pl-1 rounded border d-justify-space-between ${styles["ratings"]}`} onClick={ratingHandler} value="4">
                                        <StarSmall color="#525257"></StarSmall>
                                        <span className="font-14 f-500 l-20">4+</span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="col-12 col-sm-6 col-lg-12 btn mt-2 btn-default-width border-none btn-primary cursor-pointer">Show Results</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
