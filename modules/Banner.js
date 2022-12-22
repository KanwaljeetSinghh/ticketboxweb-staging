import styles from './css/banner.module.css';
import { useEffect, useRef, useState } from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay } from 'swiper';
import Loader from './Loader';
import BannerCard from './Banner-Card';
import CardArrow from '../icons/cardArrow';
import { getOnBoardFromCookie } from "../auth/userCookies";
function Banner(props){
    const swiperRef = useRef(null);
    const swiperNext = useRef(null);
    const swiperPrev = useRef(null);
    const queryRef = useRef(false)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const onSwiperPrev = () =>{
        swiperRef.current.swiper.slidePrev();
    }
    const onSwiperNext = () =>{
        swiperRef.current.swiper.slideNext();
    }
    const exploreEvents = () => {
        const position = document.getElementById("explore-events").offsetTop;
        window.scrollTo({
            top:position,
            behaviour:'smooth'
        })
    }
    const playStoreHandler = () => {
        window.open('https://play.google.com/store/apps/details?id=com.iu.ticketbox',"_blank")
    }
    const appStoreHandler = () => {
        window.open('https://apps.apple.com/in/app/my-ticket-box/id1633186957',"_blank")
    }
    useEffect(()=>{
        if(!queryRef.current && props.auth){
            const token = getOnBoardFromCookie();
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}` );
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch(process.env.URL+"/user/event/list?city=all", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
        }
        if(!queryRef.current && !props.auth){
            var myHeaders = new Headers();
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(process.env.URL+"/event/list?city=all", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
        }
        queryRef.current = true ;
    },[])
    if(data == null){
        return <Loader/>
    }
    return (
        <div className={`container-fluid d-flex d-flex-wrap d-align-center ${styles["tc-banner"]}`} id="banner">
            <div className='container'>
            <div className={`col-12 col-sm-10 offset-sm-1   p-relative ${styles["banner-left"]}`}>
                {/* <span className='bg-transparent rounded-5 font-10 l-20 text-white f-200 p-1 pr-2 pl-2 '>Sale 70%</span> */}
                <h1 className="l-44 text-white f-700 m-0">
                    Outside awaits
                </h1>
                {/* <p className="text-smoke-white font-15 l-24 f-400 pr-5 pb-0 mb-0">
                    Discover interesting events near you and buy tickets quickly and securely .
                </p> */}
                <div className={`col-12 col-md-8 col-lg-6 d-flex d-flex-wrap ${styles["banner-buttons"]}`}>
                    <div className={`d-flex d-flex-wrap  d-align-center  gap-3 ${styles["banner-buttons-second"]}`}>
                        <span className="text-smoke-white font-15 l-24 f-400 m-0">Get the app :</span>
                        <div className='cursor-pointer' onClick={appStoreHandler}>
                            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.166992" width="28" height="28" rx="14" fill="white"/>
                                <path d="M9.13988 20.3229L9.14251 20.3238L8.18515 21.9819C7.8357 22.5872 7.06176 22.7945 6.45648 22.4451C5.8513 22.0956 5.64382 21.3217 5.99327 20.7164L6.69852 19.4949L6.76623 19.3777C6.88709 19.204 7.18535 18.9041 7.78199 18.9605C7.78199 18.9605 9.18604 19.1129 9.28765 19.8426C9.28765 19.8426 9.30143 20.0827 9.13988 20.3229ZM22.718 16.0879H19.7327C19.5294 16.0742 19.4407 16.0016 19.4057 15.9594L19.4035 15.9555L16.2079 10.4205L16.2038 10.4232L16.0121 10.1485C15.698 9.66812 15.1993 10.8966 15.1993 10.8966C14.6037 12.2656 15.2838 13.8219 15.5208 14.2923L19.9595 21.9802C20.3088 22.5854 21.0828 22.7929 21.6881 22.4433C22.2933 22.0939 22.5008 21.3199 22.1512 20.7147L21.0414 18.7923C21.0199 18.7457 20.9825 18.6193 21.2101 18.6187H22.718C23.4169 18.6187 23.9835 18.0522 23.9835 17.3532C23.9835 16.6543 23.4169 16.0878 22.718 16.0878V16.0879ZM16.9196 17.8081C16.9196 17.8081 17.079 18.6187 16.4624 18.6187H5.4266C4.7277 18.6187 4.16113 18.0522 4.16113 17.3532C4.16113 16.6543 4.7277 16.0878 5.4266 16.0878H8.26379C8.72185 16.0613 8.83035 15.7968 8.83035 15.7968L8.83298 15.7982L12.5364 9.38353L12.5353 9.38331C12.6028 9.25939 12.5466 9.14225 12.5369 9.12376L11.3137 7.00528C10.9643 6.40011 11.1716 5.62606 11.7769 5.27672C12.3822 4.92726 13.1561 5.13453 13.5056 5.73981L14.0728 6.72233L14.639 5.74156C14.9885 5.13639 15.7624 4.9289 16.3677 5.27847C16.973 5.62792 17.1804 6.40175 16.8309 7.00703L11.6774 15.9331C11.6549 15.9875 11.648 16.0728 11.8156 16.0878H14.8961L14.8967 16.1179C14.8967 16.1179 16.6771 16.1455 16.9196 17.8081Z" fill="white"/>
                                <path d="M9.13988 20.3229L9.14251 20.3238L8.18515 21.9819C7.8357 22.5872 7.06176 22.7945 6.45648 22.4451C5.8513 22.0956 5.64382 21.3217 5.99327 20.7164L6.69852 19.4949L6.76623 19.3777C6.88709 19.204 7.18535 18.9041 7.78199 18.9605C7.78199 18.9605 9.18604 19.1129 9.28765 19.8426C9.28765 19.8426 9.30143 20.0827 9.13988 20.3229ZM22.718 16.0879H19.7327C19.5294 16.0742 19.4407 16.0016 19.4057 15.9594L19.4035 15.9555L16.2079 10.4205L16.2038 10.4232L16.0121 10.1485C15.698 9.66812 15.1993 10.8966 15.1993 10.8966C14.6037 12.2656 15.2838 13.8219 15.5208 14.2923L19.9595 21.9802C20.3088 22.5854 21.0828 22.7929 21.6881 22.4433C22.2933 22.0939 22.5008 21.3199 22.1512 20.7147L21.0414 18.7923C21.0199 18.7457 20.9825 18.6193 21.2101 18.6187H22.718C23.4169 18.6187 23.9835 18.0522 23.9835 17.3532C23.9835 16.6543 23.4169 16.0878 22.718 16.0878V16.0879ZM16.9196 17.8081C16.9196 17.8081 17.079 18.6187 16.4624 18.6187H5.4266C4.7277 18.6187 4.16113 18.0522 4.16113 17.3532C4.16113 16.6543 4.7277 16.0878 5.4266 16.0878H8.26379C8.72185 16.0613 8.83035 15.7968 8.83035 15.7968L8.83298 15.7982L12.5364 9.38353L12.5353 9.38331C12.6028 9.25939 12.5466 9.14225 12.5369 9.12376L11.3137 7.00528C10.9643 6.40011 11.1716 5.62606 11.7769 5.27672C12.3822 4.92726 13.1561 5.13453 13.5056 5.73981L14.0728 6.72233L14.639 5.74156C14.9885 5.13639 15.7624 4.9289 16.3677 5.27847C16.973 5.62792 17.1804 6.40175 16.8309 7.00703L11.6774 15.9331C11.6549 15.9875 11.648 16.0728 11.8156 16.0878H14.8961L14.8967 16.1179C14.8967 16.1179 16.6771 16.1455 16.9196 17.8081Z" fill="url(#paint0_linear_1002_4399)"/>
                                <defs>
                                <linearGradient id="paint0_linear_1002_4399" x1="14.0723" y1="5.10693" x2="14.0723" y2="22.6148" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#17C9FB"/>
                                <stop offset="1" stopColor="#1A74E8"/>
                                </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className='cursor-pointer' onClick={playStoreHandler}>
                            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.166992" width="28" height="28" rx="14" fill="white"/>
                                <path d="M16.2148 13.6533L7.78669 22.0814C7.3838 21.7003 7.16602 21.1776 7.16602 20.6114V7.39218C7.16602 6.81507 7.39468 6.29239 7.80847 5.90039L16.2148 13.6533Z" fill="#2196F3"/>
                                <path d="M23.4996 14.0017C23.4996 14.7639 23.0858 15.4391 22.3998 15.8202L20.0042 17.1486L17.0315 14.4046L16.2148 13.6533L19.3618 10.5063L22.3998 12.1833C23.0858 12.5644 23.4996 13.2395 23.4996 14.0017Z" fill="#FFC107"/>
                                <path d="M16.2149 13.6533L7.80859 5.90032C7.91748 5.79143 8.05904 5.69343 8.2006 5.60632C8.8866 5.19254 9.71417 5.18165 10.422 5.57365L19.3618 10.5064L16.2149 13.6533Z" fill="#4CAF50"/>
                                <path d="M20.0046 17.1487L10.4222 22.4298C10.0847 22.6258 9.70357 22.713 9.33335 22.713C8.94134 22.713 8.54934 22.615 8.20089 22.3972C8.04845 22.3101 7.90689 22.2012 7.78711 22.0814L16.2152 13.6533L17.0319 14.4047L20.0046 17.1487Z" fill="#F44336"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={`col-10 col-md-5  ${styles["banner-right"]}`}>
                <Swiper 
                    ref={swiperRef}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    speed={500}
                    slidesPerView={2.2}
                    onSlideChange={(swiperCore) => {
                        const {
                            realIndex,
                            slides
                        } = swiperCore;
                        if(realIndex == 0){
                            swiperPrev.current.classList.add("op-05");
                        }
                        else{
                            swiperPrev.current.classList.remove("op-05");
                        }
                        if(realIndex == slides.length-2){
                            swiperNext.current.classList.add("op-05");
                        }
                        else{
                            swiperNext.current.classList.remove("op-05");
                        }
                    }}
                    breakpoints={{
                        100: {
                            slidesPerView: 1,
                            spaceBetween: 8,
                        },
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 8,
                        },
                        367: {
                            slidesPerView: 2,
                            spaceBetween: 12,
                        },
                        568: {
                            slidesPerView: 2,
                            spaceBetween: 12,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1201: {
                            slidesPerView: 2.2,
                            spaceBetween: 15,
                        },
                        1920: {
                            slidesPerView: 2.2,
                            spaceBetween: 15,
                        },
                        2200: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        2500: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        }
                    }}
                >
                    {data.events.map((item)=>{
                        return <SwiperSlide key={item._id}><BannerCard data={item}></BannerCard></SwiperSlide>
                    })} 
                </Swiper>  
                
            </div>
            <div className={`op-05 ${styles["swiper__slider-button-left"]}`} onClick={onSwiperPrev} ref={swiperPrev}>
                <CardArrow></CardArrow>
            </div>
            <div className={styles["swiper__slider-button-right"]} onClick={onSwiperNext} ref={swiperNext}>
                <CardArrow></CardArrow>
            </div> */}
            </div>
        </div>
    )
}

export default Banner;