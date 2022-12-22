import styles from './css/modal.module.css';
function ModalAdjustWidth(props){
    return (
        <div className={styles["modal-container-adjust"]}>
            <div className={`${styles["modal-adjust-width"]} modal-class ${styles[props.align]}`}>
                <div className={`${styles["modal-content"]} `}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
export default ModalAdjustWidth;