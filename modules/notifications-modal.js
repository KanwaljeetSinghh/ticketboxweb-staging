import ModalAdjustWidth from "./Modal-adjust-width";
import styles from "./css/modal.module.css";
import NotificationData from "./notification-data";
import { useEffect,useRef,useState } from "react";
import { getOnBoardFromCookie } from "../auth/userCookies";
import Loader from "./ModalLoader";
import Link from "next/link";
export default function NotificationModal(props){
    const token = getOnBoardFromCookie();
    let queryRef = useRef(false)
    const [data, setData] = useState(null)
    useEffect(()=>{
        if(!queryRef.current)
        {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(process.env.URL+"/user/notifications", requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                setData(result.notifications);
            })
            .catch(error => console.log('error', error));
            
        }
        queryRef.current = true ;
    })
    
    if(data == null){
        return <div className={props.classes} id={props["modal-id"]}>
            <ModalAdjustWidth align="right"><Loader/></ModalAdjustWidth>
        </div>
    }
    return (
        <div className={props.classes} id={props["modal-id"]}>
            <ModalAdjustWidth align="right">
            {data.map((item,index)=>{ return index<3 && <div key={index}>
                        <NotificationData data={item}></NotificationData>
                    </div>
                })}
                {data.length > 3 && <Link href="/user/notifications">
                    <a className='col-12' onClick={props.handler}><p className='mt-2 cursor-pointer col-12 d-flex d-justify-end text-primary'>See All</p></a>
                </Link>}
            </ModalAdjustWidth>
        </div>
    );
}