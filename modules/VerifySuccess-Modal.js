import styles from "../modules/css/modal.module.css";
import Modal from "./Modal";
export default function VerifySuccess(props){
    return (
        <Modal modalClass="modal-verify" >
            <div className={`d-flex d-flex-column d-align-center gap-1 ${styles["centered"]}`} >
                <img src="/images/Congrats.png" />
                <h4 className="f-700 l-32 mb-1 mt-2">{props.title}</h4>
                <span className="f-600 font-13 l-20 text-grey text-center">{props.subtitle}</span>
                <button type="submit" className="border-none btn-modal btn-primary rounded p-2 mt-2 cursor-pointer" onClick={props.handler}>{props.button}</button>
            </div>
        </Modal>
    );
}