import { useEffect,useState,useRef } from "react";
import styles from "../../../modules/css/header.module.css";
import style from "../../../modules/css/favorites.module.css";
import Arrow from "../../../icons/arrow";
import {useRouter,Router} from "next/router";
import { getOnBoardFromCookie } from "../../../auth/userCookies";
import Link from "next/link";
import Loader from "../../../modules/Loader";
export default function Favorites(props) {
  const router = useRouter();
  let queryRef = useRef(false);
  const token = getOnBoardFromCookie();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    document.getElementById("header").classList.add(styles["fixed-header"]);
    if(!queryRef.current)
    {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      setLoading(true)
      fetch(process.env.URL+"/user/event/favorites", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status){
          setData(result.partners)
          setLoading(false)
        }
        else{
          throw new Error("Something went wrong")
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
    }
    queryRef.current = true ;
  },[]);
  if(data==null){
    return <Loader/>
  }
  return (
    <>
      <div className={`container `}>    
        <h2 className="f-500 text-primary l-40 mt-5 mb-5">Favorites</h2>
        {data.length == 0 && <h5 className="col-12 d-flex d-justify-center pt-5 f-700">No favorite partner yet!</h5>}
        <div className="d-flex d-flex-wrap">
          {data.map((item,index) =>  { 
            return <Link href={`/user/favorites/${item._id}`} key={index}>
              <a className="d-flex mt-2  col-12 col-sm-6 col-md-4 pr-5 border rounded">
                <div className="col-12 d-flex d-flex-wrap d-justify-space-between border-light-grey rounded p-2">
                  <span className="d-flex d-align-center">
                      <img src={item.imageUrl} alt="" className={`mr-3 ${style["partner__image"]}`} />
                      <h5 className="m-0">{item.name}</h5>
                  </span>
                  <div className={`d-flex d-align-center cursor-pointer ${style["arrow"]}`}>
                      <Arrow color="#212121"/>
                  </div>
                </div>
              </a>
            </Link>
            }
          )}
        </div>
        {/* <Cards data={props.partners}></Cards>  */}
      </div>
      {loading && <Loader/>}
    </>
  )
}