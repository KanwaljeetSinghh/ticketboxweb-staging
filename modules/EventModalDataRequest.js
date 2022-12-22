import styles from './css/modal.module.css';
import Dot from "../icons/dot";
import Moment from 'react-moment';
import { useRouter } from 'next/router';
export default function EventModalDataRequest(props){
    const router = useRouter();
    const handler = (e) => {
        let id = e.currentTarget.getAttribute("data");
        router.push(`/user/requestEvent/booking/${id}`)
        props.handler();
    }
    if(props.data == null){
        return <></>
    }
    return (
        <div className={styles["data-wrapper-request"]}>
        {props.data.length == 0 && <h4 className='d-flex d-justify-center mt-5 text-primary '>No tickets requested yet</h4>}
        {props.data.length > 0  && props.data.map((item,index)=>{ return <div className="d-flex mt-1  p-1 border rounded cursor-pointer" key={index} >
                <div className={`${styles["myevent-img"]}`}>
                    {item.event != null &&  <img src={item.event.thumbnail}/>}
                </div>
                <div className={`d-flex d-flex-column col-12 ml-2 ${styles["myevent-data"]}`}>
                   {item.slot != null && <div className={`d-flex d-align-center text-${props.color} mb-1`}>
                        <span className="font-12 l-16 f-500 mr-1"> <Moment utc format="dddd ">{item.slot.startDateTime}</Moment> </span>
                        <span className="font-12 l-16 f-500  ml-1"> <Moment utc format="hh:mm A" >{item.slot.startDateTime}</Moment> - <Moment utc format="hh:mm A" >{item.slot.endDateTime}</Moment></span>
                    </div>}
                    <span className="font-16 l-20 f-600 mb-1">{item.event != null?item.event.title : "Event"}</span>
                    <div className="d-flex d-justify-space-between d-align-center">
                        <div className={`d-flex d-flex-wrap d-align-center ${styles["icon-img"]}`}>
                            {item.event != null && item.event.partner.imageUrl != null ?<img src={item.event.partner.imageUrl}/>:<div className={styles["icon-img-alt"]}>{item.even != null?item.event.partner.name.charAt(0):"P"}</div>}
                            <span className="font-12 l-16 f-500 text-grey ml-1">{item.event != null?item.event.partner.name:"Partner"}</span>
                        </div>
                        <a className={`text-danger font-12 l-16 f-500 d-none ${styles[props.pending]}`}>Pending Approval</a>
                        <a className={`text-white p-1 ml-1 rounded bg-gradient font-12 l-16 f-500 d-none ${styles[props.approved]}`} onClick={handler} data={item._id}>Book Now</a>
                    </div>
                </div>
            </div>
            })}
        </div>
    );
}