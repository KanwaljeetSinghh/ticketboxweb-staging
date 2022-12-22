import React, {useState, useEffect, useRef} from 'react'
import styles from "../modules/css/autocomplete.module.css";
import { getOnBoardFromCookie } from '../auth/userCookies';
import SmallLoader from './Small-loader';
import { useRouter } from 'next/router';
export default function Autocomplete(props) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState("");
    const [data, setData] = useState([]);
    const token = getOnBoardFromCookie();
    const parent = useRef(null);
    const child = useRef(null);
    const router = useRouter();
    const handler = (e) => {
        let keyword = e.currentTarget.value;
        setEvent(e.currentTarget.value);
        if(keyword.length > 2){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
           setLoading(true)
            fetch(process.env.URL+"/event/list?city=all&search="+keyword, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status && result.events.length > 0 ){
                    setData(result.events);
                    setLoading(false)
                    if(child.current.value.length > 2){
                        parent.current.classList.add(styles["open"])
                    }
                }
                else{
                    if(child.current.value.length > 2){
                        parent.current.classList.add(styles["open"])
                    }
                    setData([]);
                    setLoading(false)
                }
            })
            .catch(error => console.log('error', error));
        }
        else{
            parent.current.classList.remove(styles["open"])
        }  
        console.log(data)
    }
    const selectHandler = (e) => {
        parent.current.classList.remove(styles["open"]);
        let id = e.currentTarget.getAttribute("id");
        router.push(`/events/${id}`)
        setEvent('');
    }
    
    return (
        <div className={`p-relative ${styles["autocomplete"]}`} ref={parent}>
            <input ref={child} type="text" placeholder={props.placeholder} onChange={handler} value={event}  />
            <div className={styles['loader']}>
                {loading && <SmallLoader type="0" />}
            </div>
            {data.length == 0 ? <ul>
                <li>No such event is founded</li>
            </ul>
            :
            <ul>
                {data.map((item) => {
                    return <li key={item._id} id={item._id} onClick={selectHandler}>{item.title}</li>
                })}
                
            </ul>}
        </div>
    )
}
