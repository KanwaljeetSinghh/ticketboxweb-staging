import styles from './css/modal.module.css';
import Cross from '../icons/cross';
import DataManageRequest from './DataManageRequest';
import Dot from "../icons/dot";
import Moment from 'react-moment';
import { getOnBoardFromCookie } from '../auth/userCookies';
import ModalLoader from './ModalLoader';
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ModalManageRequest(props){
    const token = getOnBoardFromCookie();
    const [loading, setLoading] = useState(false)
    let count = 0;
    props.data.tickets.map((item)=>{
        count = count + parseInt(item.count)
    })
    
    const acceptRequestHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "request_id": props.data._id,
            "status": "Approved"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/request/committeeMember/manageStatus", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
                list();
                toast.success(`Tickets for ${props.data.event.title} accepted`,{
                    toastId:"ms-3"
                })
            }
            
        })
        .catch(error => console.log('error', error));
    }
    const rejectRequestHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "request_id": props.data._id,
            "status": "Rejected"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/request/committeeMember/manageStatus", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
                list();
                toast.success(`Tickets for ${props.data.event.title} rejected`,{
                    toastId:"ms-4"
                })
            }
        })
        .catch(error => console.log('error', error));
    }
    const list = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(process.env.URL+"/user/request/committeeMember/list", requestOptions)
        .then(response => response.json())
        .then(result => {
            props.list(result)
            props.handler();
            setLoading(true)
        })
        .catch(error=> console.log(error))
    }
    return (
        <div className={` ${styles["modal-container-2"]} `}>
            <div className={`d-flex d-flex-column ${styles["modal-query"]}`}>
                <div className={`bg-gradient ${styles["modal-query-header"]}`}>
                    <div className={`text-right pt-1 mr-2 cursor-pointer `} onClick={props.handler}>
                        <Cross color="white" op="1"></Cross>
                    </div>
                    <h4 className='f-600 l-24 text-white text-center pt-2'>Manage Requests</h4>
                </div>
                <div className={`${styles["modal-query-content"]} mt-123`}>
                    <div className="border rounded d-flex d-flex-column p-2 mt-1 gap-1">
                        <div className={`p-relative ${styles["committee-img"]}`}>
                            <img src={props.data.event.thumbnail}/>
                            <div className={`p-absolute d-flex d-flex-column d-align-center ${styles["commiteemodal-date"]}`}>
                                <span className='f-800 font-16 l-20'><Moment utc format="D">{props.data.slot.startDateTime < 10 ? "0"+props.data.slot.startDateTime : props.data.slot.startDateTime}</Moment></span>
                                <span className='f-600 font-10 l-23'><Moment utc format="MMM">{props.data.slot.startDateTime}</Moment></span>
                            </div>
                        </div>
                        <div className="d-flex d-align-center">
                            <span className="f-500 font-12 l-16 text-light-grey mr-1">{props.data.event.type}</span>
                            <Dot color="#808085"></Dot>
                            <span className="f-500 font-12 l-16 text-light-grey ml-1">{props.data.status}</span>
                        </div>
                        <h4 className="f-600 l-24 pr-5 mt-1">{props.data.event.title}</h4>
                        <span className='font-14 f-400 l-14 text-light-grey'>Request from :<span className='text-primary ml-1'>{props.data.user.name}</span></span>
                        <span  className='font-14 f-400 l-14 text-light-grey'>Ticket Type :<span className='text-primary ml-1'>{props.data.tickets.map((item,index)=> index != props.data.tickets.length-1?`${item.type +" , " }`:item.type)}</span></span>
                        
                        <span className='font-14 f-400 l-14 text-light-grey'>Tickets No. :<span className='text-primary ml-1'>{count}</span></span>
                        <span className='font-14 f-400 l-14 text-light-grey'>Reason :<span className='text-primary ml-1'>{props.data.reason}</span></span>

                        <div className='d-flex d-align-center pr-3 mt-2'>
                            <a className={`f-600 font-14 l-20 p-1 border-primary text-primary rounded cursor-pointer`} onClick={acceptRequestHandler}>Accept Request</a>
                            <a className={`f-600 font-14 l-20 text-primary ml-4 cursor-pointer`} onClick={rejectRequestHandler}>Reject Request</a>
                        </div>
                    </div>
                </div> 
            </div>
            {loading && <ModalLoader/>}
        </div>
    );
}
export default ModalManageRequest;