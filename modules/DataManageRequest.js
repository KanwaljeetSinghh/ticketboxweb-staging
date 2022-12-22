import styles from './css/modal.module.css';
import Dot from "../icons/dot";
import Moment from 'react-moment';
import { getOnBoardFromCookie } from '../auth/userCookies';
export default function DataManageRequest(props){
    const token = getOnBoardFromCookie();
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

        fetch(process.env.URL+"/user/request/committeeMember/manageStatus", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
                props.handler();
            }
            else{
                props.handler();
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

        fetch(process.env.URL+"/user/request/committeeMember/manageStatus", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status){
                props.handler();
            }
            else{
                props.handler();
            }
            
        })
        .catch(error => console.log('error', error));
    }
    return (
        <div className="border rounded d-flex d-flex-column p-2 mt-1 gap-1">
            <div className={`p-relative ${styles["committee-img"]}`}>
                <img src={props.data.event.thumbnail}/>
                <div className={`p-absolute d-flex d-flex-column d-align-center ${styles["commiteemodal-date"]}`}>
                    <span className='f-800 font-16 l-20'><Moment format="D">{props.data.slot.startDateTime < 10 ? "0"+props.data.slot.startDateTime : props.data.slot.startDateTime}</Moment></span>
                    <span className='f-600 font-10 l-23'><Moment format="MMM">{props.data.slot.startDateTime}</Moment></span>
                </div>
            </div>
            <div className="d-flex d-align-center">
                <span className="f-500 font-12 l-16 text-light-grey mr-1">Coplay Ticket</span>
                <Dot color="#808085"></Dot>
                <span className="f-500 font-12 l-16 text-light-grey ml-1">{props.data.event.type}</span>
            </div>
            <h4 className="f-600 l-24 pr-5 mt-1">{props.data.event.title}</h4>
            <span className='font-14 f-400 l-14 text-light-grey'>Request from :<span className='text-primary ml-1'>{props.data.user.name}</span></span>
            <span className='font-14 f-400 l-14 text-light-grey'>Contact Details :<span className='text-primary ml-1'>{props.data.user.email}</span></span>
            <span className='font-14 f-400 l-14 text-light-grey'>Reason :<span className='text-primary ml-1'>{props.data.reason}</span></span>

            <div className='d-flex d-align-center pr-3 mt-2'>
                <a className={`f-600 font-14 l-20 p-1 border-primary text-primary rounded cursor-pointer`} onClick={acceptRequestHandler}>Accept Request</a>
                <a className={`f-600 font-14 l-20 text-primary ml-4 cursor-pointer`} onClick={rejectRequestHandler}>Reject Request</a>
            </div>
        </div>
    );
}