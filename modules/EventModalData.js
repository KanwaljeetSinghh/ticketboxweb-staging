import styles from './css/modal.module.css';
import Dot from "../icons/dot";
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import Rating from './Rating';
import { useState } from 'react';
export default function EventModalData(props){
    const [rateModal,setRateModal] = useState(false)
    const [rating,setRating] = useState("Rate Event")
    const router = useRouter();
    const handler = (e) => {
        let id = e.currentTarget.getAttribute("data");
        if(props.past == "no"){
            router.push(`/user/bookingDetails/${id}`)
            props.handler();
        }
    }
    const ratingHandler = () => {
        setRateModal(prev => !prev)
    }
    if(props.data == null){
        return <></>
    }
    return (
        <div className={styles["data-wrapper"]}>
            {props.data.length == 0 && <h4 className='d-flex d-align-center mt-5 d-justify-center text-primary '>No tickets purchased yet</h4>}
            {props.data.length > 0 && props.data.map((item,index)=>{return <div className="d-flex mt-1  p-1 border rounded cursor-pointer" key={index} onClick={handler} data={item._id}>
                <div className={`${styles["myevent-img"]}`}>
                    <img src={item.event.thumbnail}/>
                </div>
                <div className={`d-flex d-flex-column col-12 ml-2 ${styles["myevent-data"]}`}>
                    <div className={`d-flex d-align-center text-${props.color} mb-1`}>
                        <span className="font-12 l-16 f-500 mr-1"><Moment utc format="dddd ">{item.slot.startDateTime}</Moment></span>
                        <span className="font-12 l-16 f-500 "><Moment utc format="hh:mm A" >{item.slot.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{item.slot.endDateTime}</Moment></span>
                    </div>
                    <span className="font-16 l-20 f-600 mb-1">{item.event.title}</span>
                    <div className="d-flex d-flex-wrap d-justify-space-between ">
                        <div className={`d-flex d-flex-wrap d-align-center ${styles["icon-img"]}`}>
                            {item.event.partner.imageUrl != null ?<img src={item.event.partner.imageUrl}/>:<div className={styles["icon-img-alt"]}>{item.event.partner.name.charAt(0)}</div>}
                            <span className="font-12 l-16 f-500 text-grey ml-1">{item.event.partner.name != ' '?item.event.partner.name:'Partner'}</span>
                        </div>
                        {props.past == "yes" &&  <div className='d-flex d-flex-wrap'>
                            <span className="font-12 l-16 f-500 text-primary ml-1 mr-2" onClick={ratingHandler} id={item._id}>{rating}</span>
                        </div>
                        }
                    </div>
                </div>
                {rateModal && <Rating handler={ratingHandler} />}
            </div>
            })}
        </div>
    );
}