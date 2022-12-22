import styles from "../modules/css/modal.module.css";
import Modal from "./Modal";
export default function EventRequestModal(props){
    return (
        <Modal modalClass="modal-verify" cross="yes" handler={props.handler}>
            <div className={`d-flex d-flex-column d-align-center  `} >
                <img src="/images/Congrats.png" />
                <h4 className="f-700 l-32 text-center mt-3 mb-0">Congratulations</h4>
                <span className="f-600 font-13 l-20 text-grey text-center">Event Request {props.title} successfully.</span>
                <a className="btn btn-primary btn-default-width mt-2" onClick={props.handler}>Back</a>
            </div>
        </Modal>
    );
}