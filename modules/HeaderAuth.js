import Location from "../icons/location";
import Search from "../icons/search";
import styles from "./css/header.module.css";
import BrandLogo from "./Logo";
import MenuItem from "./Menu-Item";
import LoginModal from "./Login-Modal";
import SignupModal from "./Signup-Modal";
import Filter from "../icons/filter";
import HeaderNotify from "../icons/headernotifi";
import Shield from "../icons/shield";
import Wallet from "../icons/wallet";
import {useState,useEffect} from "react";
import VerifyModal from "./Verify-Modal";
import VerifySuccess from "./VerifySuccess-Modal";
import TagsModal from "./Tags-Modal";
import CityModal from "./City-Model";
import LocationModal from "./Location-modal";
import NotificationModal from "./notifications-modal";
import ProfileNotifications from "./profile-notifications";
import LogoutModal from "./logout-Modal";
import EventComiteeModal from "./EventComitee-Modal";
import WalletModal from "./WalletModal";
import WalletAddCashModal from "./WalletAddCashModal";
import WalletPointRedeem from "./Wallet-Point-Redeem";
import ReferFriendModal from "./ReferFriendModal";
import {useRouter} from 'next/router';
import {getOnBoardFromCookie, getOnBoardUserFromCookie,setOnBoardUserCookie,getLocationCookie,setLocationCookie} from '../auth/userCookies';
import useFirebaseAuth from "../auth/useFirebaseAuth";
import Autocomplete from "./Autocomplete";
import TagsModalProfile from "./TagsModalProfile";
import CityModalProfile from "./CityModalProfile";
import Loader from "./Loader";
import Person from "../icons/notifications/person";
import Arrow from "../icons/arrow";
import FavoriteIcon from "../icons/notifications/favoriteIcon";
import Privacy from "../icons/notifications/privacy";
import ShareIcon from "../icons/notifications/shareIcon";
import Star from "../icons/notifications/star";
import Link from "next/link"
import DeleteAccountModal from "./DeleteAccountModal";
function HeaderAuth(props){
    /* The following are the states which are responisble for opening the modals */
    const [address ,setAdress]= useState(null);
    const [name,setName] = useState('') ;
    const [photo,setPhoto] = useState(null) ;
    const [email,setEmail] = useState('')
    const [committeeMember,setCommitteeMember] = useState(false)
    const [path, setPath] = useState('');
    const [signUp, setSignUp] = useState(false);
    const [logIn,setLogIn] = useState(false);
    const [verifyEmail,setVerifyEmail] = useState(false);
    const [emailVerified,setEmailVerified] = useState(false);
    const [verifyPhone,setVerifyPhone] = useState(false);
    const [phoneVerified,setPhoneVerified] = useState(false);
    const [selectCities,setSelectCities] = useState(false);
    const [selectTags,setSelectTags] = useState(false);
    const [location,setLocation] = useState(false);
    const [notification,setNotification] = useState(false);
    const [profileNotification,setProfileNotifications] = useState(false);
    const [logout,setLogout] = useState(false);
    const [myEvents,setmyEvents] = useState(false);
    const [walletModal,setWalletModal] = useState(false);
    const [walletAddCash,setWalletAddCash] = useState(false);
    const [walletPointRedeem,setWalletPointRedeem] = useState(false);
    const [walletPointsMsg, setWalletPointsMsg] = useState("")
    const [referFriend,setReferFriend] = useState(false);
    const [tagsModalProfile,setTagsModalProfile] = useState(false)
    const [cityModalProfile,setCityModalProfile] = useState(false)
    const [hasMounted, setHasMounted] = useState(false);
    const [locationCity, setLocationcity] = useState('Your');
    const [state, setState] = useState('current');
    const [country, setCountry] = useState('location');
    const [token, setToken] = useState(getOnBoardFromCookie())
    const router = useRouter();
    const {authUser} = useFirebaseAuth();
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [currency, setCurrency] = useState(null)
    const [loading,setLoading] = useState(false)
    const [delAccount, setDelAccount] = useState(false)
    const [ForgotPasswordModal,setForgotPasswordModal] = useState(false);
    /* Modal states ends*/
    useEffect(()=>{
        const user = getOnBoardUserFromCookie();
        const location = getLocationCookie();
        if(user){
            setAdress(location)
            setName(user.name);
            setPhoto(user.photo);
            setEmail(user.email)
            setCurrency(user.currency)
            setCommitteeMember(user.isCommitteeMember)
            setHasMounted(true);
            setPath(router.pathname)
            fetch(process.env.URL+"/admin/tag/list").then(res => res.json()).then(res => setTags(res.tags));
            fetch(process.env.URL+"/admin/city/list").then(result => result.json()).then(result => setCity(result.cities));
        }
    },[])

    
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
    const notificationHandler = () =>{
        document.getElementById("notificationsModal").classList.toggle("modal-on");
        setProfileNotifications(false);
        setReferFriend(false);
        setNotification(prev => !prev);
    }
    const ProfileNotificationHandler = () =>{
        document.getElementById("profileNnotificationsModal").classList.toggle("modal-on");
        setNotification(false);
        setReferFriend(false);
        setProfileNotifications(prev => !prev);
    }
    const logoutHandler = () =>{
        document.getElementById("logoutModal").classList.toggle("modal-on");
        setProfileNotifications(false);
        setLogout(prev => !prev);
    }
    const deleteAccountHandler = () => {
        setDelAccount(prev => !prev)
    }
    const referFriendHandler = () =>{
        setWalletModal(false);
        setProfileNotifications(false);
        setReferFriend(prev => !prev);
    }
    const myEventsHandler = () =>{
        setmyEvents(prev => !prev);
    }
    const handlerLogout = (e) =>{
        document.getElementById("logoutModal").classList.toggle("modal-on");
        setLogout(prev => !prev);
        router.push('/');
        e.preventDefault();
    }
    const remainLoginHandler = (e) =>{
        document.getElementById("logoutModal").classList.toggle("modal-on");
        setLogout(false);
        e.preventDefault();
    }
    const walletModalHandler = () =>{
        setWalletPointRedeem(false);
        setNotification(false);
        setProfileNotifications(false);
        setWalletAddCash(false)
        setWalletModal(prev => !prev);
    }
    const walletAddCashHandler = () =>{
        setWalletModal(prev => !prev);
        setWalletAddCash(prev => !prev);
    }
    const pointRedeemHandler = (res) => {
        setWalletPointsMsg(res.msg)
        setWalletModal(false);
        setWalletPointRedeem(prev => !prev);
    }
    const tagHandler = () =>{
        setSelectTags(prev => !prev);
    }
    const tagsModalProfileHandler = () => {
        setProfileNotifications(false);
        setTagsModalProfile(prev => !prev)
    }
    const cityModalProfileHandler = () => {
        setProfileNotifications(false);
        setCityModalProfile(prev => !prev)
    }
    const cityHandler = () =>{
        setSelectCities(prev => !prev);
    } 
    const sideBarHandler = (e) => {
        document.getElementById("sidebar-icons").classList.toggle(styles["open"]);
        document.querySelector(`#sidebar`).classList.toggle(styles["open"]);
        // document.querySelector(`main`).classList.toggle(styles["blur"])
    }
    const currentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            displayLocation(position.coords.latitude, position.coords.longitude);
        });
        document.getElementById("getLocationModal").classList.toggle("modal-on");
    }
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
    const currencyHandler = (e) => {
        const type = e.currentTarget.getAttribute("value")
        if(type != currency){
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "currency":type
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/update", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOnBoardUserCookie(result.user)
                setCurrency(result.user.currency)
                window.location.reload();
            })
            .catch(error => console.log('error', error));
        }
    }
    const hostPanelhandler = () => {
        window.open('https://host.ticketboxonline.com/',"_blank")
    }
    if(!hasMounted){
        return <header className={`${styles["header"]}`} id="header"></header>
    }
    return (
        <>
            <header className={`${styles["header"]}`} id="header">
                <div className={`container text-white ${styles["header-top"]}`}>
                    <div className="d-flex d-flex-wrap d-align-center d-justify-space-between">
                        <div className="d-flex gap-2 cursor-pointer modal-button" >
                            <span className="font-12 l-16 f-400">My Location</span>
                            <span className="font-12 l-16 f-400 d-flex d-align-center user-select-none" onClick={locationHandler}>
                                <Location></Location>&nbsp; 
                                <u>{address == null?"Your current location":`${address.city} ${address.state}, ${address.country}`}</u>
                            </span>
                        </div>
                        <div className="d-flex d-align-center gap-2">
                            <div className={`${styles["host-dashboard"]} d-flex gap-2`}>
                            <Link href="https://host.ticketboxonline.com/">
                                <a target="_blank" rel="noopener noreferrer" className="pl-2 pr-2 cursor-pointer border">
                                    <span className="f-500 font-12 l-20">Host Dashboard</span>
                                </a>
                            </Link>
                            </div>
                            <form className={`${styles["currency-wrapper"]} d-flex gap-2`}>
                                
                                {currency == "USD" && <label className="cursor-pointer col-6 d-flex d-align-center" onClick={ currencyHandler} value="USD">
                                    <input type="radio" name="currency" id="usd" checked/>
                                    <span className="f-500 font-12 l-20" htmlFor="usd">USD</span>
                                </label>}
                                {currency != "USD" && <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="USD">
                                    <input type="radio" name="currency" id="usd" />
                                    <span className="f-500 font-12 l-20" htmlFor="usd">USD</span>
                                </label>}
                                {currency == "TTD" &&  <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="TTD">
                                    <input type="radio" name="currency" id="ttd" checked/>
                                    <span className="f-500 font-12 l-20" htmlFor="ttd" >TTD</span>
                                </label>}
                                {currency != "TTD" &&  <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="TTD">
                                    <input type="radio" name="currency" id="ttd" />
                                    <span className="f-500 font-12 l-20" htmlFor="ttd" >TTD</span>
                                </label>}
                            </form>
                        </div>
                    </div>
                    <div className={` d-flex d-align-center d-justify-space-between mt-2`}>
                        <Link href="/user"><a><BrandLogo></BrandLogo></a></Link>
                        <MenuItem value="My Tickets" classes="ml-2 p-1 rounded-6 border" handler={myEventsHandler}></MenuItem>
                        <div className={`${styles["header-input-2"]}  d-flex d-align-center border text-white bg-transparent rounded-5 `}>
                            <div className={styles["search-icon"]}>
                                <Search></Search>
                            </div>
                            <div className="d-flex d-align-center col-12">
                                <Autocomplete placeholder="Search event"></Autocomplete>
                            </div>
                            <Link href="/user/filters">
                                <a className={`col-1 d-flex d-justify-end ${styles["filter-icon"]}`}><Filter></Filter></a>
                            </Link>
                        </div>
                        <div className="d-flex d-align-center d-justify-space-between gap-4 " >
                            {committeeMember && <div className={`d-flex d-align-center cursor-pointer p-relative ${styles["show-popup"]}`} >
                                <Shield></Shield>
                                <div className={`d-none ${styles["popup"]}`}>
                                    <h6 className='f-500 text-center mb-0 '>As you are a committe member, You can approve or reject event requests.</h6>
                                </div>
                            </div>}
                            <div className="d-flex d-align-center cursor-pointer modal-button" onClick={notificationHandler}>
                                <HeaderNotify ></HeaderNotify>
                            </div>
                            <div className="d-flex d-align-center cursor-pointer" onClick={walletModalHandler}>
                                <Wallet></Wallet>
                            </div>
                            <div className={`d-flex d-align-center cursor-pointer modal-button`} onClick={ProfileNotificationHandler}>
                                <div className="d-flex d-flex-column ">
                                    <span className="font-13 l-500 l-16 text-white text-right">Hello</span>
                                    <span className="font-14 l-600 l-16 text-white">{name}</span>
                                </div>
                                <div className={` ${styles["header-img"]}`}>
                                {photo == "null" ? <div className={styles["svg-wrapper"]}>
                                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.0694 18.6875C19.7545 16.4203 17.7132 14.6631 15.2756 13.7C16.472 12.8028 17.3557 11.5518 17.8015 10.1244C18.2474 8.69705 18.2329 7.16555 17.76 5.74688C17.2871 4.3282 16.3798 3.09428 15.1667 2.2199C13.9535 1.34552 12.496 0.875 11.0006 0.875C9.50522 0.875 8.04771 1.34552 6.83457 2.2199C5.62143 3.09428 4.71415 4.3282 4.24126 5.74688C3.76837 7.16555 3.75383 8.69705 4.19972 10.1244C4.6456 11.5518 5.5293 12.8028 6.72563 13.7C4.2881 14.6631 2.24677 16.4203 0.931878 18.6875C0.782693 18.9461 0.742342 19.2533 0.819701 19.5417C0.89706 19.83 1.08579 20.0758 1.34438 20.225C1.60296 20.3742 1.91022 20.4145 2.19856 20.3372C2.4869 20.2598 2.73269 20.0711 2.88188 19.8125C3.70474 18.3874 4.8882 17.2041 6.31333 16.3813C7.73846 15.5586 9.35505 15.1254 11.0006 15.1254C12.6462 15.1254 14.2628 15.5586 15.6879 16.3813C17.1131 17.2041 18.2965 18.3874 19.1194 19.8125C19.2189 19.983 19.3612 20.1246 19.5322 20.2232C19.7032 20.3219 19.897 20.3742 20.0944 20.375C20.292 20.3766 20.4863 20.3248 20.6569 20.225C20.785 20.1512 20.8973 20.0529 20.9873 19.9356C21.0774 19.8184 21.1435 19.6845 21.1818 19.5417C21.2201 19.399 21.2299 19.25 21.2106 19.1034C21.1913 18.9569 21.1433 18.8155 21.0694 18.6875ZM6.12563 8C6.12563 7.03582 6.41154 6.09329 6.94721 5.2916C7.48289 4.48991 8.24426 3.86506 9.13505 3.49609C10.0258 3.12711 11.006 3.03057 11.9517 3.21867C12.8974 3.40677 13.766 3.87107 14.4478 4.55285C15.1296 5.23464 15.5939 6.10328 15.782 7.04893C15.9701 7.99459 15.8735 8.97479 15.5045 9.86558C15.1356 10.7564 14.5107 11.5177 13.709 12.0534C12.9073 12.5891 11.9648 12.875 11.0006 12.875C9.7077 12.875 8.46772 12.3614 7.55348 11.4471C6.63924 10.5329 6.12563 9.29293 6.12563 8Z" fill="white"/>
                                        </svg></div>
                                    :
                                    <img src={photo} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["header-small"]}>
                    <div className="col-11 d-flex d-flex-wrap d-align-center offset-1">
                        <div className="col-3">
                            <Link href="/user"><a><BrandLogo></BrandLogo></a></Link>
                        </div>
                        <div className={`col-5 ${styles["header-input-2"]}  d-flex d-align-center border text-white bg-transparent rounded-5 `}>
                            
                            <div className="d-flex d-align-center col-12">
                                <Autocomplete placeholder="Search event"></Autocomplete>
                            </div>
                            <Link href="/user/filters">
                                <a className={`col-1 d-flex d-justify-end ${styles["filter-icon"]}`}><Filter></Filter></a>
                            </Link>
                        </div>
                    </div>
                    <div role="button" onClick={sideBarHandler} id="sidebar-icons" className={`d-flex d-align-center d-justify-center ${styles["bar"]}`}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 10H26.25C27 10 27.5 9.5 27.5 8.75C27.5 8 27 7.5 26.25 7.5H3.75C3 7.5 2.5 8 2.5 8.75C2.5 9.5 3 10 3.75 10ZM16.25 20H3.75C3 20 2.5 20.5 2.5 21.25C2.5 22 3 22.5 3.75 22.5H16.25C17 22.5 17.5 22 17.5 21.25C17.5 20.5 17 20 16.25 20ZM26.25 13.75H3.75C3 13.75 2.5 14.25 2.5 15C2.5 15.75 3 16.25 3.75 16.25H26.25C27 16.25 27.5 15.75 27.5 15C27.5 14.25 27 13.75 26.25 13.75Z" fill="white"></path></svg>
                    </div>
                    <div className={`${styles["sidebar"]} d-flex d-flex-wrap height-fc`} id="sidebar">
                        
                        <div className={` ${styles["sidebar-detail"]} col-12 d-flex d-flex-wrap d-justify-center`}>
                            {photo == "null" || photo == null ? <div className={styles["svg-wrapper"]}>
                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0694 18.6875C19.7545 16.4203 17.7132 14.6631 15.2756 13.7C16.472 12.8028 17.3557 11.5518 17.8015 10.1244C18.2474 8.69705 18.2329 7.16555 17.76 5.74688C17.2871 4.3282 16.3798 3.09428 15.1667 2.2199C13.9535 1.34552 12.496 0.875 11.0006 0.875C9.50522 0.875 8.04771 1.34552 6.83457 2.2199C5.62143 3.09428 4.71415 4.3282 4.24126 5.74688C3.76837 7.16555 3.75383 8.69705 4.19972 10.1244C4.6456 11.5518 5.5293 12.8028 6.72563 13.7C4.2881 14.6631 2.24677 16.4203 0.931878 18.6875C0.782693 18.9461 0.742342 19.2533 0.819701 19.5417C0.89706 19.83 1.08579 20.0758 1.34438 20.225C1.60296 20.3742 1.91022 20.4145 2.19856 20.3372C2.4869 20.2598 2.73269 20.0711 2.88188 19.8125C3.70474 18.3874 4.8882 17.2041 6.31333 16.3813C7.73846 15.5586 9.35505 15.1254 11.0006 15.1254C12.6462 15.1254 14.2628 15.5586 15.6879 16.3813C17.1131 17.2041 18.2965 18.3874 19.1194 19.8125C19.2189 19.983 19.3612 20.1246 19.5322 20.2232C19.7032 20.3219 19.897 20.3742 20.0944 20.375C20.292 20.3766 20.4863 20.3248 20.6569 20.225C20.785 20.1512 20.8973 20.0529 20.9873 19.9356C21.0774 19.8184 21.1435 19.6845 21.1818 19.5417C21.2201 19.399 21.2299 19.25 21.2106 19.1034C21.1913 18.9569 21.1433 18.8155 21.0694 18.6875ZM6.12563 8C6.12563 7.03582 6.41154 6.09329 6.94721 5.2916C7.48289 4.48991 8.24426 3.86506 9.13505 3.49609C10.0258 3.12711 11.006 3.03057 11.9517 3.21867C12.8974 3.40677 13.766 3.87107 14.4478 4.55285C15.1296 5.23464 15.5939 6.10328 15.782 7.04893C15.9701 7.99459 15.8735 8.97479 15.5045 9.86558C15.1356 10.7564 14.5107 11.5177 13.709 12.0534C12.9073 12.5891 11.9648 12.875 11.0006 12.875C9.7077 12.875 8.46772 12.3614 7.55348 11.4471C6.63924 10.5329 6.12563 9.29293 6.12563 8Z" fill="white"/>
                                </svg></div>
                            :
                            <img src={photo} />
                            }
                            
                            <span className="col-12 text-center font-18 f-600 l-15 text-white">{name}</span>
                            <span className="col-12 text-center font-14 f-400 l-15 text-white">{email}</span>
                            <div className={styles["close-modal"]} onClick={sideBarHandler}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7619 14.9993L22.1369 9.63676C22.3723 9.40138 22.5045 9.08213 22.5045 8.74926C22.5045 8.41638 22.3723 8.09713 22.1369 7.86176C21.9016 7.62638 21.5823 7.49414 21.2494 7.49414C20.9166 7.49414 20.5973 7.62638 20.3619 7.86176L14.9994 13.2368L9.63694 7.86176C9.40156 7.62638 9.08231 7.49414 8.74944 7.49414C8.41656 7.49414 8.09732 7.62638 7.86194 7.86176C7.62656 8.09713 7.49432 8.41638 7.49432 8.74926C7.49432 9.08213 7.62656 9.40138 7.86194 9.63676L13.2369 14.9993L7.86194 20.3618C7.74477 20.478 7.65178 20.6162 7.58832 20.7685C7.52486 20.9209 7.49219 21.0842 7.49219 21.2493C7.49219 21.4143 7.52486 21.5777 7.58832 21.73C7.65178 21.8823 7.74477 22.0205 7.86194 22.1368C7.97814 22.2539 8.11639 22.3469 8.26871 22.4104C8.42104 22.4738 8.58442 22.5065 8.74944 22.5065C8.91445 22.5065 9.07783 22.4738 9.23016 22.4104C9.38248 22.3469 9.52073 22.2539 9.63694 22.1368L14.9994 16.7618L20.3619 22.1368C20.4781 22.2539 20.6164 22.3469 20.7687 22.4104C20.921 22.4738 21.0844 22.5065 21.2494 22.5065C21.4145 22.5065 21.5778 22.4738 21.7302 22.4104C21.8825 22.3469 22.0207 22.2539 22.1369 22.1368C22.2541 22.0205 22.3471 21.8823 22.4106 21.73C22.474 21.5777 22.5067 21.4143 22.5067 21.2493C22.5067 21.0842 22.474 20.9209 22.4106 20.7685C22.3471 20.6162 22.2541 20.478 22.1369 20.3618L16.7619 14.9993Z" fill="white"></path></svg>
                            </div>
                        </div>
                        <div className={styles["sidebar-content"]}>
                            <div className={`col-12 pl-2 pr-2 d-flex d-flex-wrap  `}>
                                <div className="col-6 col-xs-6 d-flex d-align-center " >
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.9748 8.75632C19.9747 8.75623 19.9747 8.75618 19.9747 8.7561L16.5762 0.222813C16.5041 0.0415028 16.2986 -0.0470101 16.1172 0.0251164C16.1171 0.0251606 16.117 0.0252048 16.1168 0.0252931L2.32967 5.51522C2.27344 5.53951 2.22468 5.57829 2.18833 5.62758C2.07367 5.68716 2.00124 5.80509 2 5.93428V15.1213C2 15.3164 2.15821 15.4746 2.35335 15.4746H17.1938C17.389 15.4746 17.5472 15.3164 17.5472 15.1213V10.1038L19.7775 9.21545C19.9588 9.14314 20.0471 8.93758 19.9748 8.75632ZM16.8405 14.7679H2.70669V6.28763H16.8405V14.7679ZM7.89556 5.5827L13.812 3.22519C14.34 3.7802 15.0716 4.09565 15.8377 4.09866L16.4278 5.5827H7.89556ZM17.5472 9.34477V5.93428C17.5472 5.73915 17.389 5.58094 17.1938 5.58094H17.1882L16.4394 3.70044C16.4311 3.68476 16.4215 3.66983 16.4105 3.65591C16.3726 3.48573 16.215 3.36962 16.0412 3.38384C15.3284 3.44881 14.6312 3.14855 14.1886 2.58599C14.0785 2.45008 13.885 2.41629 13.7353 2.50684C13.7185 2.50882 13.7019 2.51192 13.6855 2.51602L6.4624 5.39225C6.37499 5.42653 6.30507 5.4945 6.26841 5.58094H4.07484L16.0504 0.812546L19.1878 8.69037L17.5472 9.34477Z" fill="black"/>
                                        <path d="M3.6644 12.3823C4.35042 12.5851 4.88724 13.1212 5.09085 13.807C5.13551 13.9567 5.27318 14.0592 5.42936 14.0593C5.44769 14.0581 5.46588 14.0554 5.48377 14.0511C5.49963 14.0557 5.51584 14.059 5.53218 14.061H14.0125C14.027 14.0591 14.0414 14.0562 14.0556 14.0522C14.2321 14.0951 14.41 13.9869 14.453 13.8103C14.4531 13.8097 14.4533 13.8091 14.4534 13.8084C14.6565 13.1219 15.1934 12.585 15.8799 12.3819C16.0464 12.3311 16.1498 12.1652 16.1223 11.9933C16.127 11.9761 16.1304 11.9586 16.1325 11.941V9.11421C16.1305 9.0965 16.1269 9.07901 16.1219 9.06192C16.1496 8.88997 16.0461 8.72399 15.8795 8.67324C15.1931 8.4702 14.6563 7.93307 14.4538 7.24643C14.4026 7.07881 14.2351 6.9751 14.0623 7.00403C14.0459 6.99948 14.0293 6.99617 14.0125 6.99414H5.53218C5.51438 6.99626 5.49676 6.99979 5.47953 7.00474C5.30767 6.97736 5.14187 7.08075 5.09085 7.24714C4.88763 7.93346 4.35077 8.4702 3.6644 8.67324C3.49793 8.72412 3.39449 8.89001 3.422 9.06192C3.41741 9.0791 3.4141 9.09654 3.41211 9.11421V11.941C3.41414 11.9576 3.41745 11.974 3.422 11.9901C3.39303 12.1631 3.49669 12.3308 3.6644 12.3823ZM4.1188 9.25767C4.82832 8.9727 5.39067 8.41035 5.67564 7.70083H13.8686C14.1538 8.41035 14.7162 8.9727 15.4258 9.25767V11.7975C14.7165 12.0828 14.1543 12.6451 13.869 13.3544H5.67564C5.39036 12.6451 4.8281 12.0828 4.1188 11.7975V9.25767Z" fill="black"/>
                                        <path d="M9.77437 12.6464C10.9453 12.6464 11.8944 11.6972 11.8944 10.5263C11.8944 9.35542 10.9453 8.40625 9.77437 8.40625C8.60347 8.40625 7.6543 9.35542 7.6543 10.5263C7.65545 11.6967 8.60396 12.6452 9.77437 12.6464ZM9.77437 9.11294C10.555 9.11294 11.1877 9.74574 11.1877 10.5263C11.1877 11.3069 10.555 11.9397 9.77437 11.9397C8.99378 11.9397 8.36099 11.3069 8.36099 10.5263C8.36099 9.74574 8.99378 9.11294 9.77437 9.11294Z" fill="black"/>
                                        <path d="M5.88744 11.0581C6.18014 11.0581 6.41746 10.8208 6.41746 10.5281C6.41746 10.2354 6.18014 9.99805 5.88744 9.99805C5.59474 9.99805 5.35742 10.2354 5.35742 10.5281C5.35742 10.8208 5.59474 11.0581 5.88744 11.0581ZM5.88744 10.3514C5.98501 10.3514 6.06411 10.4305 6.06411 10.5281C6.06411 10.6256 5.98501 10.7047 5.88744 10.7047C5.78987 10.7047 5.71077 10.6256 5.71077 10.5281C5.71077 10.4305 5.78987 10.3514 5.88744 10.3514Z" fill="black"/>
                                        <path d="M13.6609 11.0581C13.9536 11.0581 14.1909 10.8208 14.1909 10.5281C14.1909 10.2354 13.9536 9.99805 13.6609 9.99805C13.3682 9.99805 13.1309 10.2354 13.1309 10.5281C13.1309 10.8208 13.3682 11.0581 13.6609 11.0581ZM13.6609 10.3514C13.7584 10.3514 13.8375 10.4305 13.8375 10.5281C13.8375 10.6256 13.7584 10.7047 13.6609 10.7047C13.5633 10.7047 13.4842 10.6256 13.4842 10.5281C13.4842 10.4305 13.5633 10.3514 13.6609 10.3514Z" fill="black"/>
                                    </svg>

                                    <span className="ml-2 text-center font-16  f-600 l-20 ">Currency</span>
                                </div>
                                <form className={`${styles["currency-wrapper"]} d-flex col-6 col-xs-6 d-flex-wrap `}>
                                    {currency == "USD" && <label className="cursor-pointer col-6 d-flex d-align-center " onClick={ currencyHandler} value="USD">
                                        <input type="radio" name="currency" id="usd" checked/>
                                        <span className="f-500 font-12 f-600 l-20 ml-1" htmlFor="usd">USD</span>
                                    </label>}
                                    {currency != "USD" && <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="USD">
                                        <input type="radio" name="currency" id="usd" />
                                        <span className="f-500 font-12 l-20 f-600  ml-1" htmlFor="usd">USD</span>
                                    </label>}
                                    {currency == "TTD" &&  <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="TTD">
                                        <input type="radio" name="currency" id="ttd" checked/>
                                        <span className="f-500 font-12 l-20 f-600 ml-1" htmlFor="ttd" >TTD</span>
                                    </label>}
                                    {currency != "TTD" &&  <label className="cursor-pointer col-6 d-flex d-align-center" onClick={currencyHandler} value="TTD">
                                        <input type="radio" name="currency" id="ttd" />
                                        <span className="f-500 font-12 l-20 f-600 ml-1" htmlFor="ttd" >TTD</span>
                                    </label>}
                                </form>
                                <div className="col-12 col-xs-6 d-flex d-align-center " onClick={myEventsHandler} onMouseUp={sideBarHandler}>
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.375 6.1625C20.7985 6.07605 21.1791 5.84593 21.4525 5.51109C21.7258 5.17625 21.8751 4.75725 21.875 4.325V2C21.8725 1.50348 21.6742 1.028 21.3231 0.676897C20.972 0.325799 20.4965 0.127464 20 0.125H2C1.50348 0.127464 1.028 0.325799 0.676897 0.676897C0.325799 1.028 0.127464 1.50348 0.125 2V4.325C0.124912 4.75725 0.274169 5.17625 0.54751 5.51109C0.820852 5.84593 1.20149 6.07605 1.625 6.1625C2.04886 6.24857 2.42993 6.47852 2.70364 6.8134C2.97736 7.14828 3.12688 7.56749 3.12688 8C3.12688 8.43251 2.97736 8.85172 2.70364 9.1866C2.42993 9.52148 2.04886 9.75143 1.625 9.8375C1.20149 9.92395 0.820852 10.1541 0.54751 10.4889C0.274169 10.8238 0.124912 11.2428 0.125 11.675V14C0.127464 14.4965 0.325799 14.972 0.676897 15.3231C1.028 15.6742 1.50348 15.8725 2 15.875H20C20.4965 15.8725 20.972 15.6742 21.3231 15.3231C21.6742 14.972 21.8725 14.4965 21.875 14V11.675C21.8751 11.2428 21.7258 10.8238 21.4525 10.4889C21.1791 10.1541 20.7985 9.92395 20.375 9.8375C19.9511 9.75143 19.5701 9.52148 19.2964 9.1866C19.0226 8.85172 18.8731 8.43251 18.8731 8C18.8731 7.56749 19.0226 7.14828 19.2964 6.8134C19.5701 6.47852 19.9511 6.24857 20.375 6.1625ZM2.375 11.9656C3.23638 11.719 3.99402 11.1986 4.53338 10.4831C5.07273 9.76762 5.36446 8.89599 5.36446 8C5.36446 7.10401 5.07273 6.23238 4.53338 5.5169C3.99402 4.80143 3.23638 4.28102 2.375 4.03437V2.375H6.875V13.625H2.375V11.9656ZM19.625 11.9656V13.625H9.125V2.375H19.625V4.03437C18.7636 4.28102 18.006 4.80143 17.4666 5.5169C16.9273 6.23238 16.6355 7.10401 16.6355 8C16.6355 8.89599 16.9273 9.76762 17.4666 10.4831C18.006 11.1986 18.7636 11.719 19.625 11.9656Z" fill="#808085"/>
                                    </svg>
                                    <span className="ml-2 text-center font-16  f-600 l-20 ">MyTickets</span>
                                </div>
                                <div className="col-12 col-xs-6 d-flex  d-align-center user-select-none modal-button" onClick={locationHandler} onMouseUp={sideBarHandler}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_868_34440)">
                                        <path d="M12.25 5.8335C12.25 9.91683 7 13.4168 7 13.4168C7 13.4168 1.75 9.91683 1.75 5.8335C1.75 4.44111 2.30312 3.10575 3.28769 2.12119C4.27226 1.13662 5.60761 0.583496 7 0.583496C8.39239 0.583496 9.72774 1.13662 10.7123 2.12119C11.6969 3.10575 12.25 4.44111 12.25 5.8335Z" stroke="#808085" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7 7.5835C7.9665 7.5835 8.75 6.8 8.75 5.8335C8.75 4.867 7.9665 4.0835 7 4.0835C6.0335 4.0835 5.25 4.867 5.25 5.8335C5.25 6.8 6.0335 7.5835 7 7.5835Z" stroke="#808085" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_868_34440">
                                        <rect width="14" height="14" fill="#808085"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="ml-2 font-16 f-600">{locationCity} {state} , {country}</span>
                                </div>
                                <Link href="/user/notifications">
                                    <a className="col-12 col-xs-6 d-flex d-align-center cursor-pointer" onMouseUp={sideBarHandler}>   
                                        <div className="d-flex d-align-center d-justify-space-between" >
                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.0287 15.3031C18.4943 14.3844 17.8568 12.6312 17.8568 9.5V8.83437C17.8568 4.475 14.3599 0.903125 10.0568 0.875H10.0006C8.96729 0.874997 7.94416 1.07882 6.98977 1.47481C6.03538 1.8708 5.16849 2.45116 4.43872 3.18267C3.70895 3.91417 3.13066 4.78246 2.73695 5.73778C2.34324 6.69311 2.14185 7.71673 2.14432 8.75V9.5C2.14432 12.6312 1.50682 14.3844 0.972442 15.3031C0.808631 15.5887 0.72251 15.9123 0.722656 16.2415C0.722803 16.5708 0.809213 16.8942 0.973279 17.1797C1.13734 17.4651 1.37334 17.7026 1.65775 17.8685C1.94217 18.0343 2.26508 18.1228 2.59432 18.125H5.89432C5.99203 19.1463 6.46686 20.0946 7.22612 20.7847C7.98538 21.4748 8.97456 21.8571 10.0006 21.8571C11.0266 21.8571 12.0158 21.4748 12.775 20.7847C13.5343 20.0946 14.0091 19.1463 14.1068 18.125H17.4068C17.7361 18.1228 18.059 18.0343 18.3434 17.8685C18.6278 17.7026 18.8638 17.4651 19.0279 17.1797C19.1919 16.8942 19.2783 16.5708 19.2785 16.2415C19.2786 15.9123 19.1925 15.5887 19.0287 15.3031ZM10.0006 19.625C9.56879 19.6233 9.15068 19.4734 8.81619 19.2004C8.48171 18.9273 8.25114 18.5477 8.16307 18.125H11.8381C11.75 18.5477 11.5194 18.9273 11.1849 19.2004C10.8505 19.4734 10.4323 19.6233 10.0006 19.625ZM3.21307 15.875C4.17869 13.85 4.39432 11.3281 4.39432 9.5V8.75C4.39061 8.01185 4.53295 7.28027 4.81314 6.59736C5.09334 5.91445 5.50585 5.29372 6.02693 4.77089C6.54801 4.24807 7.16737 3.83348 7.84934 3.55101C8.53131 3.26854 9.26241 3.12375 10.0006 3.125H10.0474C13.1131 3.14375 15.6068 5.70312 15.6068 8.83437V9.5C15.6068 11.3281 15.8224 13.85 16.7881 15.875H3.21307Z" fill="#808085"/>
                                            </svg>
                                            <span className="ml-2 text-center font-16 f-600 l-20">Notifications</span>
                                        </div>
                                    </a>
                                </Link>
                                <div className="col-12 col-xs-6 d-flex d-align-center cursor-pointer" onClick={walletModalHandler} onMouseUp={sideBarHandler}>
                                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.375 10.5C13.375 10.2033 13.463 9.91332 13.6278 9.66664C13.7926 9.41997 14.0269 9.22771 14.301 9.11418C14.5751 9.00065 14.8767 8.97094 15.1677 9.02882C15.4586 9.0867 15.7259 9.22956 15.9357 9.43934C16.1455 9.64912 16.2883 9.91639 16.3462 10.2074C16.4041 10.4983 16.3744 10.7999 16.2608 11.074C16.1473 11.3481 15.955 11.5824 15.7084 11.7472C15.4617 11.912 15.1717 12 14.875 12C14.4772 12 14.0957 11.842 13.8144 11.5607C13.5331 11.2794 13.375 10.8978 13.375 10.5ZM20.125 6V15.75C20.1226 16.2465 19.9242 16.722 19.5731 17.0731C19.222 17.4242 18.7465 17.6225 18.25 17.625H3.25001C2.55458 17.6225 1.88834 17.3452 1.39659 16.8534C0.90484 16.3617 0.627485 15.6954 0.625015 15V3.39375C0.623782 2.99855 0.700401 2.60698 0.850498 2.2414C1.0006 1.87581 1.22123 1.54337 1.49981 1.26305C1.77838 0.982733 2.10944 0.760031 2.47409 0.607659C2.83873 0.455287 3.22982 0.376229 3.62502 0.375H16C16.2984 0.375 16.5845 0.493526 16.7955 0.704505C17.0065 0.915483 17.125 1.20163 17.125 1.5C17.125 1.79837 17.0065 2.08452 16.7955 2.2955C16.5845 2.50647 16.2984 2.625 16 2.625H3.62502C3.4215 2.62692 3.22663 2.70755 3.08126 2.85C2.94848 2.99255 2.87476 3.18019 2.87501 3.375V3.39375C2.88936 3.59434 2.9799 3.78184 3.12807 3.91781C3.27624 4.05378 3.47081 4.12791 3.67189 4.125H18.25C18.7465 4.12746 19.222 4.3258 19.5731 4.6769C19.9242 5.028 20.1226 5.50348 20.125 6ZM17.875 6.375H3.67189C3.40295 6.37489 3.13513 6.34023 2.87501 6.27188V15C2.87501 15.0995 2.91452 15.1948 2.98485 15.2652C3.05518 15.3355 3.15056 15.375 3.25001 15.375H17.875V6.375Z" fill="#808085"/>
                                    </svg>
                                    <span className="ml-2 text-center font-16 f-600 l-20">MyWallet</span>
                                </div>
                                <Link href="/user/edit-profile">
                                    <a className="col-12 col-xs-6 d-flex d-align-center" onMouseUp={sideBarHandler}>
                                        <div className="d-flex d-align-center d-justify-space-between" >
                                            <div className="d-flex d-align-center">
                                                <Person></Person>
                                                <span className="font-16 f-600 l-20 ml-2">Edit profile</span>                
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <Link href="/user/favorites">
                                    <a className="col-12 col-xs-6 d-flex d-align-center">
                                        <div className="d-flex d-align-center d-justify-space-between"  onMouseUp={sideBarHandler}>
                                            <div className="d-flex d-align-center">
                                                <FavoriteIcon></FavoriteIcon>
                                                <span className="font-16 f-600 l-20 ml-2">Favorites</span>                
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <div className="d-flex d-align-center col-12 col-xs-6 cursor-pointer" onClick={cityModalProfileHandler} onMouseUp={sideBarHandler}>
                                    <div className="d-flex d-align-center">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_868_34440)">
                                            <path d="M12.25 5.8335C12.25 9.91683 7 13.4168 7 13.4168C7 13.4168 1.75 9.91683 1.75 5.8335C1.75 4.44111 2.30312 3.10575 3.28769 2.12119C4.27226 1.13662 5.60761 0.583496 7 0.583496C8.39239 0.583496 9.72774 1.13662 10.7123 2.12119C11.6969 3.10575 12.25 4.44111 12.25 5.8335Z" stroke="#808085" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M7 7.5835C7.9665 7.5835 8.75 6.8 8.75 5.8335C8.75 4.867 7.9665 4.0835 7 4.0835C6.0335 4.0835 5.25 4.867 5.25 5.8335C5.25 6.8 6.0335 7.5835 7 7.5835Z" stroke="#808085" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_868_34440">
                                            <rect width="14" height="14" fill="#808085"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                        <span className="font-16 f-600 l-20 ml-2">Change Places</span>                
                                    </div>
                                </div>
                                <div className="d-flex d-align-center col-12 col-xs-6 cursor-pointer" onClick={tagsModalProfileHandler} onMouseUp={sideBarHandler}>
                                    <div className="d-flex d-align-center">
                                        <Star></Star>
                                        <span className="font-16 f-600 l-20 ml-2">Change Interests</span>                
                                    </div>
                                </div>
                                
                                <div className="col-12 col-xs-6 d-flex d-align-center d-justify-space-between cursor-pointer cursor-pointer" onMouseUp={sideBarHandler} onClick={referFriendHandler}>
                                    <div className="d-flex d-align-center">
                                        <ShareIcon></ShareIcon>
                                        <span className="font-16 f-600 l-20 ml-2">Refer a Friend</span>                
                                    </div>
                                </div>
                                <Link href="/policy">
                                    <a className="col-12 col-xs-6 d-flex d-align-center" onMouseUp={sideBarHandler}>
                                        <div className="d-flex d-align-center d-justify-space-between" >
                                            <div className="d-flex d-align-center">
                                                <Privacy></Privacy>
                                                <span className="font-16 f-600 l-20 ml-2">Privacy Policy</span>                
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <div className="col-12 mb-5 d-flex d-flex-wrap d-align-center d-justify-space-between mt-4">
                                    <span className="col-6 col-xs-4 font-16 f-600 l-20 text-danger cursor-pointer modal-button" onClick={logoutHandler} onMouseUp={sideBarHandler}>Logout</span> 
                                    <Link href="https://host.ticketboxonline.com/"><a target="_blank" rel="noopener noreferrer"><span className="col-6 col-xs-4 font-16 f-600 l-20 text-primary cursor-pointer" onClick={hostPanelhandler} onMouseUp={sideBarHandler}>Host Dashboard</span></a></Link>
                                    <Link href="/user/deleteAccount"><a><span className="col-6 col-xs-4 font-16 f-600 l-20 text-danger cursor-pointer"  onMouseUp={sideBarHandler}>Delete Account</span></a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {loading && <Loader/>}
            {selectTags && <TagsModal handler={tagsHandler} tagHandler={tagHandler} data={tags}></TagsModal>}
            {selectCities && <CityModal handler={citiesHandler} cityHandler={cityHandler} data={city}></CityModal>}
            <NotificationModal handler={notificationHandler} classes={`ticketbox-modal`} modal-id="notificationsModal"></NotificationModal>
            <LocationModal handler={locationHandler} getLocation={currentLocation} classes={`ticketbox-modal`} modal-id="getLocationModal"></LocationModal>
            <ProfileNotifications handler={ProfileNotificationHandler} classes={`ticketbox-modal`} side={ProfileNotificationHandler} modal-id="profileNnotificationsModal" cities={cityModalProfileHandler} preferences={tagsModalProfileHandler} logoutHandler={logoutHandler} delete={deleteAccountHandler} referFriendHandler={referFriendHandler}></ProfileNotifications>
            <LogoutModal handler={handlerLogout} remainLogin={remainLoginHandler} classes={`ticketbox-modal`} modal-id="logoutModal"></LogoutModal>
            {delAccount && <DeleteAccountModal handler={deleteAccountHandler}/>}
            {referFriend && <ReferFriendModal handler={referFriendHandler}></ReferFriendModal>}
            {myEvents && <EventComiteeModal handler={myEventsHandler}></EventComiteeModal>}
            {walletModal && <WalletModal handler={walletModalHandler} pointRedeemHandler={pointRedeemHandler} addCashHandler={walletAddCashHandler}></WalletModal>}
            {walletPointRedeem && <WalletPointRedeem handler={pointRedeemHandler} walletModalHandler={walletModalHandler} msg={walletPointsMsg}></WalletPointRedeem>}
            {walletAddCash && <WalletAddCashModal handler={walletAddCashHandler} walletModal={walletModalHandler}></WalletAddCashModal>}
            {tagsModalProfile && <TagsModalProfile data={tags} handler={tagsModalProfileHandler} />}
            {cityModalProfile && <CityModalProfile data={city} handler={cityModalProfileHandler} />}
        </>
    );
}
export default HeaderAuth;