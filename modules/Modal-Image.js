import { useState } from "react";
import styles from "../modules/css/modal.module.css";
import Check from "../icons/check";
export default function ModalImage(props){
    const [active,setActive] = useState(false);
    const handler = () =>{
        setActive(prev => !prev);
    }
    return(
        <div className={`d-flex d-flex-column ${props.classes}-${active?1:0}`} key-value={props.idValue} key-name={props.title}>
            <div className={`p-relative ${styles["image__section"]}`} onClick={handler}>
                <img src={props.src} />
                <span className={`p-absolute ${styles["image__check"]} `}>
                    {active?<Check color={props.fillcolor} ></Check>:<Check color={props.color} ></Check>}
                </span>
            </div>
            
            <span className="font-16 f-600 l-20 mt-1">{props.title}</span>
            <span className="font-12 f-500 l-16">{props.subtitle}</span>
            
        </div>
    );
}