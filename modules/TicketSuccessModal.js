import styles from "../modules/css/modal.module.css";
import Modal from "./Modal";
export default function CancelTicketSuccessModal(props){
    return (
        <Modal modalClass="modal-verify" cross="yes" handler={props.handler}>
            <div className={`d-flex d-flex-column d-align-center  `} >
                <img src="/images/Congrats.png" />
                <h4 className="f-700 l-32 text-center mt-3 mb-0">{props.heading}</h4>
                <span className="f-600 font-13 l-20 text-grey text-center">You Successfully {props.title} your ticket.</span>
                <a className="btn btn-primary btn-default-width mt-2">Back to Home</a>
            </div>
        </Modal>
    );
}