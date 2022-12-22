import styles from './css/cards.module.css';
import Router from "next/router"
function BannerCard(props){
    const handler = () => {
        if(props.data.isRequestBased){
            Router.push(`user/requestEvent/${props.data._id}`)
        }else{
            Router.push(`/events/${props.data._id}`)
        }
    }
    return(
        <div className={`${styles["card__wrapper"]} bg-transparent p-2 cursor-pointer`} onClick={handler}>
            <div className={`${styles["card__image"]}`}>
                <img src={props.data.thumbnail} />
            </div>
            <div className={`${styles["card__body"]}`}>
                <h5 className="l-24 mb-0 f-600 text-white">{props.data.title}</h5>
                <p className=" font-14 l-18 f-600 text-smoke-white">{props.data.location.city}</p>
                <h4 className=" l-22 f-600 text-white">TT$ {(props.data.tickets[0].price).toFixed(2)}</h4>
            </div>
        </div>
    )
}

export default BannerCard;