import styles from "./css/organizer.module.css";
import MapComponent from "./MapComponent";
import {getLocationCookie} from '../auth/userCookies';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Location(props){
    const location = getLocationCookie();
    const handler = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${props.data.latitude},${props.data.longitude}`,"_blank")
    }
    return (
        <div className={`col-12 ${styles["orgazier__wrapper"]}`}>
            <div className="d-flex d-align-center d-justify-space-between">
                <span className={`m-0 f-700 font-28 l-20`}>
                    Location
                </span>
                <a  rel="noopener noreferrer" className={`p-1 btn-rounded small home-featured-tab active text-gradient cursor-pointer`} onClick={handler}>Directions</a>
            </div>
            
            <div className={`mt-4 ${styles["orgazier__heading__location"]}`}>
                <MapComponent cords={props.data}/>
            </div>
            <ToastContainer
                    toastClassName={styles["toaster-message"]}
                    position={'top-right'}
                    hideProgressBar={false}
                    closeOnClick={true}
                    draggable={true}
            ></ToastContainer>
        </div>
    )
}

export default Location;