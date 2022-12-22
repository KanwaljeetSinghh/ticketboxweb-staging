import styles from './css/modal.module.css';
import Cross from '../icons/cross';
function ModalWithBg(props){
    return (
        <div className={` ${styles["modal-container"]} `}>
            <div className={`d-flex d-flex-column ${styles["modal-query"]}`}>
                <div className={`bg-gradient ${styles["modal-query-header"]}`}>
                    <div className={`text-right pt-1 mr-2 cursor-pointer `} onClick={props.handler}>
                        <Cross color="white" op="1"></Cross>
                    </div>
                    <h4 className='f-600 l-24 text-white text-center pt-1 pb-5'>{props.title}</h4>
                </div>
                <div className={`${styles["modal-query-content"]}`}>
                    {props.children}
                </div> 
            </div>
        </div>
    );
}
export default ModalWithBg;