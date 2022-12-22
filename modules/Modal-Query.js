import styles from './css/modal.module.css';
import Cross from '../icons/cross';
import ToggleIconModal from './ToggleIconModal';
import { getOnBoardUserFromCookie,getOnBoardFromCookie } from '../auth/userCookies';
import {useState,useEffect} from 'react';

function ModalQuery(props){
    const [committeData,setCommitteData] = useState([])
    const [approvedData,setApprovedData] = useState([])
    const [isCommitteeMember,setISCommitteeMember] = useState(false);
    const token = getOnBoardFromCookie();
    useEffect(()=>{
        const user = getOnBoardUserFromCookie();
        setISCommitteeMember(user.isCommitteeMember);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}` );
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(process.env.URL+"/user/request/list/Approved", requestOptions)
        .then(response => response.json())
        .then(result => {
            setApprovedData(result.requests)
        })
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
            setCommitteData(result.requests)
        })
        .catch(error => console.log('error', error));
    },[committeData.length])
    if(isCommitteeMember == null){
        return <></>
    }
    return (
        <div className={` ${styles["modal-container"]} `}>
            <div className={`d-flex d-flex-column ${styles["modal-query"]}`}>
                <div className={`bg-gradient d-flex-wrap d-flex d-align-center d-justify-center ${styles["modal-query-header"]}`}>
                    <div className={`col-12 text-right pt-1 mr-2 cursor-pointer `} onClick={props.handler}>
                        <Cross color="white" op="1"></Cross>
                    </div>
                    <div className='col-12 col-sm-8 d-flex d-align-center d-justify-space-around mb-2'>
                        <span className={`font-16 l-24 f-600 text-white ${approvedData.length > 0 && styles["area-heading"]} p-relative`}>My Events</span>
                        {isCommitteeMember == true && <>
                            <ToggleIconModal handler={props.toggleHandler}></ToggleIconModal>
                            <span className={`font-16 l-24 f-600 text-white ${committeData.length > 0 && styles["area-heading"]} p-relative`}>Commitee Area</span>
                        </>}
                    </div>
                </div>
                <div className={`${styles["modal-query-content"]}`}>
                    {props.children}
                </div> 
            </div>
        </div>
    );
}
export default ModalQuery;