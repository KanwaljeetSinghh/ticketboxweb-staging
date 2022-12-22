import styles from './css/cards.module.css';
import Dot from '../icons/dot';
import Router from "next/router"
import Moment from 'react-moment';
import { getOnBoardFromCookie,getOnBoardUserFromCookie } from "../auth/userCookies";
import { useEffect,useState } from 'react';
function Card(props){
    const token = getOnBoardFromCookie();
    const [currency,setCurrency] = useState(null)
    const [rate, setRate] = useState(1)
    const [price, setPrice] = useState(null)

    useEffect(()=>{
        const user = getOnBoardUserFromCookie();
        if(user){
            setCurrency(user.currency);
            setRate(parseFloat(user.rate));
        }
        else{
            setCurrency("USD");
        }
        if(props.data.tickets && props.data.tickets.length > 0){
            
            setPrice(`Starts from ${currency == "TTD"?"TTD "+(props.data.tickets[0].price*parseFloat(rate)).toFixed(2):"USD "+props.data.tickets[0].price.toFixed(2)}`)
            
        }
    },[currency,price])
    if(!currency || !price){
        return <></>
    }
    const handler = () => {
        Router.push(`/events/${props.data._id}`)
    }
    return(
        <div className={`${styles["card__wrapper"]} bg-white p-2 cursor-pointer`} onClick={handler}>
            <div className={`d-flex p-relative ${styles["card__image"]}`}>
                <img src={props.data.thumbnail} />
                <div className={`d-flex d-flex-column ${styles["card__badge"]}`}>
                    <h3 className="text-secondary f-600 mb-0"><Moment utc format="D">{props.data.nearestDate < 10 ? "0"+props.data.nearestDate : props.data.nearestDate}</Moment></h3>
                    <h4 className="l-27 f-400 mb-0"><Moment utc format="MMM">{props.data.nearestDate}</Moment></h4>
                </div>
            </div>
            <div className={`${styles["card__body"]}`}>
                <a className="h5 l-28 text-secondary  mb-1 f-600 ">{props.data.title}</a>
                <div className="d-flex d-align-center mt-1 mb-1">
                    <img src={props.data.partner.imageUrl} alt="partner-image"/>
                    <span className="f-500 font-15 l-16 text-light-grey ml-1">{props.data.partner.name}</span>
                </div>
                <div className={`${styles["card__body__location"]} d-flex d-align-center mt-1 mb-2`}>
                    <img src="/images/location.png" alt="location"/>
                    <span className="f-500 font-15 l-16 text-light-grey ml-1">{props.data.venue}</span>
                </div>
                <div className='d-flex d-justify-space-between'>
                    <h4 className="text-gradient l-28 f-600 mb-0">{isNaN(price)?price:price}</h4>
                    <div className='d-flex d-align-center'>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z" fill="#FFC700" stroke="#FFC700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h4 className="text-gradient ml-1 l-28 f-600 mb-0">{props.data.partner.hasOwnProperty("ratingsAverage") ? props.data.partner.ratingsAverage.$numberDecimal:"0"}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;