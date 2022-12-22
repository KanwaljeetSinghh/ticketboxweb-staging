import { SyncLoader } from 'react-spinners';
import styles from "../modules/css/modal.module.css";
export default function Loader(){
    return (
        <div className={`${styles["modal-loader"]} d-flex d-align-center d-justify-center`}>
            <SyncLoader size={30} color="#5D48D0"></SyncLoader>
        </div>
    );
}