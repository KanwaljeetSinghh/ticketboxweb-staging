// This Dropdown is designed for getting the all the tickets and their price

import { useState } from "react";
import styles from "../modules/css/dropdown.module.css";
import { getOnBoardUserFromCookie } from "../auth/userCookies";
export default function DropDown(props){
    const user = getOnBoardUserFromCookie();
    const currency = user.currency;
    const [value, setValue] = useState(props.placeholder);
    const [price, setPrice] = useState(0);
    const [ticketType, setTicketType] = useState("")
    const handler = (e) => {
        e.currentTarget.classList.toggle(styles["open"]);
    }
    const selectHandler = (e) => {
        setValue(e.currentTarget.getAttribute("value"));
        setPrice(e.currentTarget.getAttribute("ticket-price"));
        setTicketType(e.currentTarget.getAttribute("ticket-type"));

        if(props.placeholder != e.currentTarget.getAttribute("value")){
            props.handler(e.currentTarget.getAttribute("ticket-type"),e.currentTarget.getAttribute("ticket-price"));
        }else{
            props.handler("",0);
        }
    }

    return (
        <div className={`${styles["drop-down"]}`} onClick={handler} style={{backgroundColor:props.color}}>
            <span className="tickets-adder-dropdown" ticket-type={ticketType} ticket-price={price} ticket-count={props.count}> {value} </span>
            {!props.data && <ul>
                <li value={props.placeholder} onClick={selectHandler}>
                    {props.placeholder}
                </li>
                <li value="Item 1" onClick={selectHandler}>
                    Item 1
                </li>
                <li value="Item 2" onClick={selectHandler}>
                    Item 2
                </li>
                <li value="Item 3" onClick={selectHandler}>
                    Item 3
                </li>
            </ul>
            }

            {props.data && <ul>
                <li value={props.placeholder} onClick={selectHandler}>
                    {props.placeholder}
                </li>
                {props.data.map((item,index) => { 
                    return (
                        <li value={`${item.ticketType} ${currency == "USD"?"$":"TT$"} ${item.price.toFixed(2)}`} ticket-type={item.ticketType} ticket-price={item.price} onClick={selectHandler} key={index}>
                            {item.ticketType} {currency == "USD"?"$":"TT$"} {item.price.toFixed(2)}
                        </li>
                    )
                })}
            </ul>
            }

            <span>
                <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 0.374191C16.2018 0.375484 15.9158 0.493227 15.7031 0.702316L9 7.40544L2.29687 0.702316C2.08553 0.490973 1.79888 0.37224 1.5 0.37224C1.20111 0.37224 0.914468 0.490973 0.703123 0.702316C0.491779 0.913661 0.373047 1.2003 0.373047 1.49919C0.373047 1.79808 0.491779 2.08472 0.703123 2.29607L8.20312 9.79607C8.30764 9.90095 8.43183 9.98416 8.56858 10.0409C8.70532 10.0977 8.85193 10.127 9 10.127C9.14806 10.127 9.29467 10.0977 9.43142 10.0409C9.56816 9.98416 9.69236 9.90095 9.79687 9.79607L17.2969 2.29607C17.4018 2.19155 17.485 2.06736 17.5418 1.93061C17.5985 1.79387 17.6278 1.64726 17.6278 1.49919C17.6278 1.35113 17.5985 1.20452 17.5418 1.06777C17.485 0.931025 17.4018 0.806833 17.2969 0.702316C17.0842 0.493227 16.7982 0.375484 16.5 0.374191Z" fill="#525257"/>
                </svg>
            </span>
        </div>
    )
}