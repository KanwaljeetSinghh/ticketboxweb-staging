import ComiteeDataModal from "./ComiteeDataModal";
import { useState,useEffect,useRef } from "react";
import ModalManageRequest from "./ModalManageRequest";
import { getOnBoardFromCookie } from "../auth/userCookies";
import ModalLoader from "./ModalLoader";
export default function ComiteeArea(props){
    const token = getOnBoardFromCookie();
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState({
        requests:[]
    });
    const list = (result) => {
        setData(result)
    }
    const committeDatalength = (len) => {
        return len;
    }
    const queryRef = useRef(null)
    useEffect(()=>{
        if(!queryRef.current){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
            setLoading(true)
            fetch(process.env.URL+"/user/request/committeeMember/list", requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                committeDatalength(result.requests.length);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
        queryRef.current = true
    },[data.requests.length])
    if(data == null){
        return <ModalLoader/>
    }
    return (
        <>
            {data.status > 0 && data.requests.length == 0 && <h3 className="text-primary height-modal f-600 d-flex d-justify-center d-align-center">No tickets requested yet</h3>} 
            <div className="mt-123"></div>
            {data.status > 0 && data.requests.map((item,index)=>{ return <ComiteeDataModal data={item}  key={index} list={list}></ComiteeDataModal>
            })}
            {loading && <ModalLoader/>}
        </>
    );
    }