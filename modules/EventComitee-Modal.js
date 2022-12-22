import ModalQuery from "./Modal-Query";
import styles from './css/modal.module.css';
import MyEvents from "./MyEvents";
import { useState } from "react";
import ComiteeArea from "./Comitee-Area";

export default function EventComiteeModal(props){
    
    const [toggle,setToggle] = useState(true);
    const toggleHandler = () =>{
        setToggle(prev => !prev);
    }
    return (
        <ModalQuery handler={props.handler} toggleHandler={toggleHandler}>
            {toggle && <MyEvents handler={props.handler}></MyEvents> }
            {!toggle && <ComiteeArea></ComiteeArea> }
        </ModalQuery>
    );
}