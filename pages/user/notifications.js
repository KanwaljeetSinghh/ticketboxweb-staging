import {useEffect,useRef, useState} from 'react'
import styles from "../../modules/css/favorites.module.css"
import styless from "../../modules/css/header.module.css";
import { getOnBoardFromCookie } from '../../auth/userCookies';
import Loader from '../../modules/Loader';
import Moment from 'react-moment';
import { Router } from 'next/router';
export default function Notifications(props) {
  const [data,setData] = useState(null);
  let queryRef = useRef(false);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    document.getElementById("header").classList.add(styless["fixed-header"]);
    if(!queryRef.current)
    {
      const token = getOnBoardFromCookie();
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
      fetch(process.env.URL+"/user/notifications", requestOptions)
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
    <div className="container bg-white p-5 rounded">
      {loading && <Loader/>}
        <h1 className='text-primary col-12 '>Notifications</h1>
        {data.notifications.length == 0 && <span className='col-12 d-flex d-justify-center font-14 l-20 f-500 text-grey'>No new Notifications</span>}
        {data.notifications.map((item,index)=>{return <div key={index} className="col-12 d-flex d-flex-wrap  border-bottom pb-1">
            <div className={`col-3 col-sm-1 d-flex mt-3 d-align-center ${styles["notification-img"]}`}>
                <img src={item.image == ""?"/images/logo.png":item.image}/>
            </div>
            <div className='col-9 col-sm-11 pl-2 d-flex d-flex-wrap'>
                <div className='col-12 d-flex d-align-center d-justify-space-between mt-3'>
                    <span className='font-14 l-20 f-500 text-grey capitalize'>{item.notificationType}</span>
                    <span className='font-12 l-20 f-500 text-grey'>
                    {<Moment fromNow={true}>{item.createdAt}</Moment>}
                    </span>
                </div>
                <span className='col-12 font-16 l-20 f-600 mt-1'>{item.title}</span>
                <span className='col-12 font-14 l-20 f-500 text-grey mt-1'>{item.body}</span>
            </div>
        </div>
        })}
    </div>
  )
}
