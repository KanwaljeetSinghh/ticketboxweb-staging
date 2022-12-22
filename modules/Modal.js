import styles from './css/modal.module.css';
import Cross from '../icons/cross';
function Modal(props){
    return (
        <div className={`${styles["modal-container"]}`}>
            <div className={`${styles[props.modalClass]}`}>
                <div className={`text-right pt-1 mr-2 d-none cursor-pointer ${styles[props.cross]}`} onClick={props.handler}>
                    <Cross color="#929292"></Cross>
                </div>
                <div className={`${styles["modal-content"]}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
export default Modal;