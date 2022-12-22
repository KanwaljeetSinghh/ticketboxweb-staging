import Modal from "./Modal";
import styles from "../modules/css/modal.module.css";
export default function VerifyModal(props){
    return (
        <Modal modalClass="modal-verify" cross="yes" handler={props.verifyHandler}>
            
            <div className={`d-flex d-flex-column gap-1`}>
                <h4 className="f-600 l-23 m-0 mt-3 mb-1">Verify {props.title}</h4>
                <span className="f-400 font-13 l-16 text-grey">Please verify {props.title} first to continue using this application</span>
                <span className="f-400 f-13 l-20 text-grey mt-4 ">Code is sent to your {props.title}</span>
                <span className="f-600 f-16 l-20 ">{props.account}</span>
            </div>
             
      </Modal> 
    );
}