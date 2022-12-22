import { useRef } from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import Card from "./Card";
import styles from './css/cards.module.css';
import CardArrow from '../icons/cardArrow';

function Cards(props){
    const swiperRef = useRef(null);

    const onSwiperPrev = () =>{
        swiperRef.current.swiper.slidePrev();
    }
    const onSwiperNext = () =>{
        swiperRef.current.swiper.slideNext();
    }
    return(
        <div className='p-relative'>
            <Swiper 
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                    100:{
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                    400: {
                        slidesPerView: 1.3,
                        spaceBetween: 12,
                    },
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1367: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    }
                }}
            >
                {props.data.map((item)=>{
                    return <SwiperSlide key={item._id}><Card data={item}></Card></SwiperSlide>
                })} 
            </Swiper>
            {props.data.length >3 &&<div className={styles["swiper__slider-button-left"]} onClick={onSwiperPrev}>
                <CardArrow></CardArrow>
            </div>
            }
            {props.data.length >3 &&<div className={styles["swiper__slider-button-right"]} onClick={onSwiperNext}>
                <CardArrow></CardArrow>
            </div> } 
        </div>
    )
}

export default Cards;


     