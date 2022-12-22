import Location from "../icons/location";
import Search from "../icons/search";
import styles from "./css/header.module.css";
import BrandLogo from "./Logo";
import MenuItem from "./Menu-Item";
import LoginModal from "./Login-Modal";
import SignupModal from "./Signup-Modal";
import Filter from "../icons/filter";
import {useState,useEffect, useContext} from "react";
import VerifyModal from "./Verify-Modal";
import VerifySuccess from "./VerifySuccess-Modal";
import TagsModal from "./Tags-Modal";
import CityModal from "./City-Model";
import LocationModal from "./Location-modal";
import Autocomplete from "./Autocomplete";
import {useRouter} from 'next/router';
import {getOnBoardFromCookie, getOnBoardUserFromCookie, setOnBoardUserCookie, removeOnBoardUserCookie,getLocationCookie,setLocationCookie} from '../auth/userCookies';
import useFirebaseAuth from "../auth/useFirebaseAuth";
import Link from "next/link";
import Loader from "./Loader";
import ForgotPassword from "./ForgotPassword";
function Header(props){
    /* The following are the states which are responisble for opening the modals */
    const [address ,setAdress]= useState(null);
    const [signUp, setSignUp] = useState(false);
    const [logIn,setLogIn] = useState(false);
    const [verifyEmail,setVerifyEmail] = useState(false);
    const [emailVerified,setEmailVerified] = useState(false);
    const [verifyPhone,setVerifyPhone] = useState(false);
    const [phoneVerified,setPhoneVerified] = useState(false);
    const [selectCities,setSelectCities] = useState(false);
    const [profileNotifications, setProfileNotifications] = useState(false)
    const [selectTags,setSelectTags] = useState(false);
    const [location,setLocation] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [token, setToken] = useState(getOnBoardFromCookie())
    const [locationCity, setLocationcity] = useState('Your');
    const [state, setState] = useState('current');
    const [country, setCountry] = useState('location');
    const [email,setEmail] = useState('')
    const router = useRouter();
    const {authUser} = useFirebaseAuth();
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [loading,setLoading] = useState(false)
    const [ForgotPasswordModal,setForgotPasswordModal] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const currencyTypeHandler = (e, type) => {
        setCurrency(type);
        removeOnBoardUserCookie();
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(process.env.URL+"/admin/get/currencyConversion", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            let user={
                email: null,
                name: null,
                country:null,
                countryCode:null,
                phone: null,
                photo: null,
                emailVerifies: null,
                isCommitteeMember: null,
                referralCode: null,
                currency: type,
                rate: result.currencyConversion[1].conversionRate
            }
            setOnBoardUserCookie(user);
            window.location.reload();
        })
        .catch(error => console.log('error', error));
        
    }
    /* Modal states ends*/
    function displayLocation(latitude,longitude){
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latitude, longitude);
        geocoder.geocode(
            {'latLng': latlng}, 
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].formatted_address ;
                        var  value = add.split(",");
                        var count = value.length;
                        var statePin = value[count-2];
                        var state = statePin.split(" ");
                        let address = {
                            lat:latitude,
                            lng:longitude,
                            city:value[count-3],
                            state:state[1],
                            country:value[count-1]
                        }
                        setAdress(address)
                        setLocationCookie(address)
                    }
                    else  {
                        console.log("address not found");
                    }
                }
                else {
                    console.log("Geocoder failed due to: " + status);
                }
            }
        );
    }
    const emailVerifiedHandler = (e) =>{
        setVerifyEmail(false);
        setEmailVerified(true);
        e.preventDefault();
    }
    const emailSuccessHandler = () =>{
        setEmailVerified(false);
        setVerifyPhone(true);
    }
    const phoneVerifiedHandler = (e) =>{
        setVerifyPhone(false);
        setPhoneVerified(true);
        e.preventDefault();
    }
    const phoneSuccessHandler = () => {
        setPhoneVerified(false);
        setProfileNotifications(false);
        setSelectTags(true);
    }
    const tagsHandler = (e) =>{
        setSelectTags(false);
        setSelectCities(true);
        e.preventDefault();
    }
    const citiesHandler = (e) =>{
        setSelectCities(false);
        e.preventDefault();
    }
    const locationHandler = (e) =>{
        document.getElementById("getLocationModal").classList.toggle("modal-on");
        setProfileNotifications(false);
        setLocation(prev => !prev);
    }
    const SignUpHandler = () =>{
        setLogIn(false);
        setSignUp(prev => !prev);
    }
    const LogInHandler = () =>{
        setSignUp(false);
        setLogIn(prev => !prev);
    }
    const registerFormHandler = (email) =>{
        setSignUp(false);
        setVerifyEmail(true);
        setEmail(email)
    } 
    const verifyEmailHandler = () =>{
        setVerifyEmail(prev => !prev);
    }
    const verifyPhoneHandler = () =>{
        setVerifyPhone(prev => !prev);   
    }
    const tagHandler = () =>{
        setSelectTags(prev => !prev);
    }
    const cityHandler = () =>{
        setSelectCities(prev => !prev);
    } 
    const currentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            displayLocation(position.coords.latitude, position.coords.longitude);
        });
        document.getElementById("getLocationModal").classList.toggle("modal-on");
    }
    const hostPanelhandler = () => {
        window.open('https://host.ticketboxonline.com/',"_blank")
    }
    const ForgotPasswordModalHandler = () => {
        setForgotPasswordModal(prev => !prev)
        setLogIn(false)
    }
    useEffect(()=>{
        const cookie = getOnBoardUserFromCookie();
        if(cookie){
            setCurrency(cookie.currency);
        }
        const location = getLocationCookie();
        setAdress(location)
        setToken(getOnBoardFromCookie());
        setHasMounted(true);
        fetch(process.env.URL+"/admin/tag/list").then(res => res.json()).then(res => setTags(res.tags));
        fetch(process.env.URL+"/admin/city/list").then(result => result.json()).then(result => setCity(result.cities));
        
    },[])
    if(!hasMounted){
        return <header className={`${styles["header"]}`} id="header"></header>
    }
    return (
        <>
            <header className={`${styles["header"]}`} id="header">
                <div className={`container text-white }`}>
                    <div className={`d-flex d-flex-wrap  d-align-center ${styles["small-screen-top-header"]}`}>
                        <div className={`d-flex d-flex-wrap d-align-center d-justify-space-between ${styles["location-wrapper"]}`}>
                            <div className="d-flex gap-2 cursor-pointer" >
                                <span className="font-12 l-16 f-400">My Location</span>
                                <span className="font-12 l-16 f-400 d-flex d-align-center user-select-none modal-button" onClick={locationHandler}>
                                    <Location></Location>&nbsp; 
                                    <u>{address == null?"Your current location":`${address.city} ${address.state}, ${address.country}`}</u>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex d-align-center gap-2 d-justify-end">
                            <div className={`${styles["host-dashboard"]} d-flex gap-2`}>
                                <Link href="https://host.ticketboxonline.com/">
                                    <a target="_blank" rel="noopener noreferrer" className="pl-2 pr-2 cursor-pointer">
                                        <span className="f-500 font-12 l-20">Host Dashboard</span>
                                    </a>
                                </Link>
                            </div>
                            <div className={`${styles["currency-wrapper"]} d-flex gap-2`}>
                                <label className="cursor-pointer col-6 d-flex d-align-center" onClick={ (e) => currencyTypeHandler(e,"USD") } value="USD">
                                    {currency == "USD" && <input type="radio" id="usd" checked />}
                                    {currency != "USD" && <input type="radio" id="usd" />}
                                    <span className="f-500 font-12 l-20" htmlFor="usd">USD</span>
                                </label>
                                <label className="cursor-pointer col-6 d-flex d-align-center" onClick={ (e) => currencyTypeHandler(e,"TTD") } value="TTD">
                                    {currency == "TTD" && <input type="radio" id="ttd" checked /> } 
                                    {currency != "TTD" && <input type="radio" id="ttd" />}
                                    <span className="f-500 font-12 l-20" htmlFor="ttd" >TTD</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex d-align-center  d-justify-space-between mt-2">
                        <Link href="/"><a><BrandLogo></BrandLogo></a></Link>
                        <div className={`${styles["header-center-menu"]} d-flex d-align-center `}>
                            <div className={`${styles["header-input"]} ml-5 d-flex d-align-center border text-white bg-transparent rounded-5 `}>
                                <div className={styles["search-icon"]}>
                                    <Search></Search>
                                </div>
                                <div className="d-flex d-align-center col-12">
                                    <Autocomplete placeholder="Search event"></Autocomplete>
                                </div>
                                <Link href="/filters">
                                    <a className={`col-1 d-flex d-justify-end ${styles["filter-icon"]}`}><Filter></Filter></a>
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <MenuItem value="Sign Up" classes="pr-2 pl-2 border-right" handler={SignUpHandler}></MenuItem>
                            <MenuItem value="Login"  classes="pl-2 " handler={LogInHandler}></MenuItem> 
                        </div>
                    </div>
                </div>
            </header>
            {loading && <Loader/>}
            {ForgotPasswordModal && <ForgotPassword handler={ForgotPasswordModalHandler} />}
            <LocationModal handler={locationHandler} getLocation={currentLocation} classes={`ticketbox-modal`} modal-id="getLocationModal"></LocationModal>
            {signUp && <SignupModal handler={SignUpHandler} loginHandler={LogInHandler} registerFormHandler={registerFormHandler}></SignupModal>}
            {logIn && <LoginModal handler={LogInHandler} signUpHandler={SignUpHandler} forgot={ForgotPasswordModalHandler}></LoginModal>}
            {verifyEmail && <VerifyModal title="Email" account={email} handler={emailVerifiedHandler} verifyHandler={verifyEmailHandler}></VerifyModal>}
            {emailVerified && <VerifySuccess title="Email" handler={emailSuccessHandler}></VerifySuccess>}
            {verifyPhone && <VerifyModal title="Phone" account="+91-90565-62565" handler={phoneVerifiedHandler} verifyHandler={verifyPhoneHandler}></VerifyModal>}
            {phoneVerified && <VerifySuccess title="Phone" handler={phoneSuccessHandler}></VerifySuccess>}
            {selectTags && <TagsModal handler={tagsHandler} tagHandler={tagHandler} data={tags}></TagsModal>}
            {selectCities && <CityModal handler={citiesHandler} cityHandler={cityHandler} data={city}></CityModal>}
        </>
    );
}
export default Header;