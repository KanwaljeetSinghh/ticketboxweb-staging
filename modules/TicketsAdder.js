import React, { useState } from 'react'
import DropDown from './TicketsDropDown'
import PlusWithBg from "../icons/pluswithbg";
import MinusWithBg from "../icons/minuswithbg";
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../modules/css/header.module.css";

export default function TicketsAdder(props) {

  const [count, setCount] = useState(0);
  const [ticket, setTicket] = useState("");
  const [price, setPrice] = useState(0);
  const mangeTicket = (type,pri) => {
    if(ticket != ""){
      props.handler("change",price,count);
    }
    setTicket(type);
    setPrice(pri);
    setCount(0);
  }
  const countPlus = () => {
    if(ticket){
      if(parseInt(props.count) < 4){
        setCount(prev => prev + 1);
        props.handler("inc",price,count);
      }
      else{
        toast.info("You can only add 4 tickets",{
          toastId:"td-1"
        }) 
      }
    }
    else{
      toast.info("Please select the ticket first from drop-down",{
        toastId:"td-2"
      }) 
    }
  }
  const countMinus = () => {
    if(ticket){
      if(count > 0){
        let obj = {
          "type": ticket,
          "price": price,
          "count": count - 1
        }
        setCount(prev => prev - 1);
        props.handler("dec",price,count);
      }
      else{
        
      }
    }
    else{
      toast.info("Please select the ticket first from drop-down",{
        toastId:"td-3"
      }) 
    }
  }
  return (
    <div className="d-flex d-justify-space-between d-align-center mb-2 ticket_wrapper">
        <div className="col-9 pr-3">
            <DropDown color="#EEE" placeholder="Select Ticket" data={props.data} handler={mangeTicket} count={count}></DropDown>
        </div>
        <div className="col-3 d-flex d-justify-space-between d-align-center">
            <div role="button" className='cursor-pointer d-flex d-align-center' onClick={countMinus}>
              <MinusWithBg></MinusWithBg>
            </div>
            <h4 className="f-500 l-24 m-0 user-select-none">{count}</h4>
            <span role="button" className='cursor-pointer d-flex d-align-center' onClick={countPlus}>
              <PlusWithBg></PlusWithBg>
            </span>
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
