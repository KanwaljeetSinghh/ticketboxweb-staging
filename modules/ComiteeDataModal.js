import styles from './css/modal.module.css';
import Dot from "../icons/dot";
import { useState } from "react";
import ModalManageRequest from "./ModalManageRequest";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ComiteeDataModal(props){
    const[manage,setManage] = useState(false);
    const manageRequestHandler = () =>{
        setManage(prev => !prev);
    }
    if(props.data == null){
        return <></>
    }
    return (
        <div className="border rounded d-flex d-flex-column p-2 mt-1 gap-1">
            <div className={`p-relative ${styles["committee-img"]}`}>
                <img src={props.data.event.thumbnail}/>
                <div className={`p-absolute d-flex d-flex-column d-align-center ${styles["commiteemodal-date"]}`}>
                    <span className='f-800 font-16 l-20'><Moment utc format="DD">{props.data.slot.startDateTime < 10 ? "0"+props.data.slot.startDateTime : props.data.slot.startDateTime}</Moment></span>
                    <span className='f-600 font-10 l-23'><Moment utc format="MMM">{props.data.slot.startDateTime}</Moment></span>
                </div>
            </div>
            <div className="d-flex d-align-center m-0">
                <span className="f-500 font-12 l-16 text-light-grey mr-1">{props.data.event.partner.name} </span>
            </div>
            <h4 className="f-600 l-24 pr-5 m-0">{props.data.event.title}</h4>
            <a className={`${styles["manage-request"]} mt-1 rounded`}  onClick={manageRequestHandler}>Manage Requests</a>
            {manage && <ModalManageRequest handler={manageRequestHandler} data={props.data} list={props.list}></ModalManageRequest>}
            <ToastContainer
                toastClassName={styles["toaster-message"]}
                position={'top-right'}
                hideProgressBar={false}
                closeOnClick={true}
                draggable={true}
            ></ToastContainer>
        </div>
    );
}