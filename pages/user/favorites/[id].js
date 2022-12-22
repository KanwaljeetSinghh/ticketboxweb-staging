import React,{useEffect,useState,useRef} from 'react'
import Cards from '../../../modules/Cards'
import styless from "../../../modules/css/header.module.css";
import Link from 'next/link';
import { useRouter,Router } from 'next/router';
import { getOnBoardFromCookie } from '../../../auth/userCookies';
import Loader from '../../../modules/Loader';
export default function FavoriteEvents(props) {
  const router = useRouter();
  let queryRef = useRef(false)
  const [data, setData] = useState([]);
  const [partnerName, setPartnerName] = useState('');
  const [similar, setSimilar] = useState(null)
  const [loading,setLoading] = useState(false)
  const [eventId, setEventId] = useState(null);
  useEffect(()=>{
    setEventId(router.query["id"]);
    const token = getOnBoardFromCookie();
    if(eventId)
    {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      setLoading(true)
      fetch(process.env.URL+"/user/event/list?city=all&partner_id="+eventId, requestOptions)
        .then(response => {
          if(response.status){
            return response.json()
          }
          else{
            throw new Error("Something went wrong!")
          }
        })
        .then(result => {
            setData(result.events);
            if(result.events.length>0){
              setPartnerName(result.events[0].partner.name)
              var myHeaders = new Headers();
              myHeaders.append("Authorization", `Bearer ${token}`);
              var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
              };
              // fetch(process.env.URL+"/user/event/list?event="+eventId, requestOptions)
              // .then(response => response.json())
              // .then(result => {
              //     setSimilar(result.events)
              //     setLoading(false)
              //   })
              // .catch(error => console.log('error', error));
            }
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
    document.getElementById("header").classList.add(styless["fixed-header"]);

  },[eventId])
  if(data == null ){
    return <Loader/>
  }
  return (
    <>
        <div className={`container `}> 
            <div className='d-flex d-align-center'>   
              <Link href="/user/favorites"><a className="cursor-pointer mr-3">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.704992 7.82811L5.65166 12.7748C5.76012 12.8841 5.88915 12.9709 6.03132 13.0301C6.17349 13.0894 6.32598 13.1199 6.47999 13.1199C6.63401 13.1199 6.7865 13.0894 6.92866 13.0301C7.07083 12.9709 7.19987 12.8841 7.30833 12.7748C7.52562 12.5562 7.64758 12.2605 7.64758 11.9523C7.64758 11.6441 7.52562 11.3484 7.30833 11.1298L3.17832 6.99977L7.30833 2.86977C7.52562 2.65119 7.64758 2.35549 7.64758 2.04727C7.64758 1.73906 7.52562 1.44336 7.30833 1.22477C7.19931 1.11664 7.07003 1.0311 6.92788 0.973041C6.78574 0.914983 6.63353 0.885553 6.47999 0.886441C6.32645 0.885553 6.17425 0.914983 6.0321 0.973041C5.88996 1.0311 5.76067 1.11664 5.65166 1.22477L0.704992 6.17144C0.595642 6.2799 0.508849 6.40893 0.449619 6.5511C0.390389 6.69327 0.359894 6.84576 0.359894 6.99977C0.359894 7.15379 0.390389 7.30628 0.449619 7.44845C0.508849 7.59062 0.595642 7.71965 0.704992 7.82811Z" fill="#875ECD"/>
                      </svg>
              </a></Link>
              <h2 className="f-500 l-40 mt-5 mb-5">Events from <span className='text-primary'>{partnerName}</span></h2>

            </div>
            {data.length == 0 && <h5 className='col-12 pt-5 d-flex d-justify-center'>Favorite events are not added!</h5>}
            {data.length > 0 && <Cards data={data}/>}
        </div>
        {loading && <Loader/>}
    </>
  )
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}