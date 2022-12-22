import { useEffect, useState } from "react";
import Arrow from "../../icons/arrow";
import Cards from "../../modules/Cards";
import styles from "../../modules/css/header.module.css";
import styless from "../../modules/css/payment.module.css";
import ToggleIcon from "../../modules/ToggleIcon";
import Plus from "../../icons/plus";
import VoucherModal from "../../modules/Voucher-Modal";

export default function PaymentDetails() {
    
  useEffect(()=>{
    document.getElementById("header").classList.add(styles["fixed-header"]);
    })
    const[voucher,setVoucher] = useState(false);

    const voucherHandler = () =>{
        setVoucher(prev => !prev);
    }

  return (
      <>
      
        <div className={`container bg-white rounded-20 p-5`}>
            <div className="col-12 col-md-4 pt-2 pl-2">
                <p className="font-36 l-20 f-600 mb-1 ">Personal Details</p>
                <span className="font-14 l-20 f-600 text-grey">Please enter your personal details</span>
                <div className="d-flex d-justify-space-between d-align-center mt-4">
                    <span className="font-16 l-20 f-600">For Someone else</span>
                    <ToggleIcon></ToggleIcon>
                </div>
            </div>
            <form className={`${styless["payment-form"]} d-flex d-flex-wrap d-justify-space-between`}>
                <div className="col-12 col-md-6 d-flex d-flex-column p-2">
                    <label className="font-14 f-600 l-20">First Name</label>
                    <input type="text" placeholder="Enter your First name" className={`${firstName = ""?styless.active:""} `}/>
                    <label className="font-14 f-600 l-20">Enter your email</label>
                    <input type="email" placeholder="Enter your email"/>
                </div>
                <div className="col-12 col-md-6  d-flex d-flex-column p-2">
                    <label className="font-14 f-600 l-20">Last Name</label>
                    <input type="text" placeholder="Enter your last name"/>
                    <label className="font-14 f-600 l-20">Contact Number</label>
                    <input type="text" placeholder="Enter your number"/>
                </div>
                <div className="col-12 col-md-6  mt-5 pr-5 p-2">
                    <div className="d-flex d-justify-space-between">
                        <h4 className="f-700 l-20 m-0">Add Multiple ticket</h4>
                        <Arrow color="#1C1C1C"></Arrow>
                    </div>
                    <span className="font-14 l-20 f-400 mt-1 text-light-grey">Please enter your friends personal details</span>
                    <h4 className="f-700 l-20 mt-3 mb-0">Rewards</h4>
                    <span className=" font-14 l-20 f-500 text-light-grey">Select your rewards</span>
                    <div className="bg-smoke-white rounded mt-2 p-2 ">
                        <div className="d-flex d-justify-space-between ">
                            <span className="f-500 font-16 l-20">Points</span>
                            <input type="checkbox" name="points" />
                        </div>
                        <div className="d-flex d-justify-space-between mt-2">
                            <span className="f-600 font-16 l-20 text-primary">Available balance</span>
                            <span className="f-500 font-16 l-24 text-success">TT$ 100</span>
                        </div>
                    </div>
                    <h4 className="f-700 l-20 mt-2 mb-0">Voucher</h4>
                    <div className="bg-smoke-white border mt-1 rounded p-2 d-flex d-justify-space-between cursor-pointer" onClick={voucherHandler}>
                        <span className="f-500 font-16 l-24 text-grey">Choose your voucher</span>
                        <div className="transform-90">
                            <Arrow color="#808085" ></Arrow>
                        </div>   
                    </div>
                </div>
                <div className="col-12 col-md-6  mt-3 p-2">
                    <h4 className="f-700 l-20 mt-4 mb-0">Payment Method</h4>
                    <span className="font-14 f-500 mt-1 l-20 text-light-grey">Choose your payment method</span>
                    <div className={`mt-2 text-grey`}>
                        <div className="bg-smoke-white mb-2 rounded p-2 d-flex d-justify-space-between">
                            <span className="f-500 font-16 l-20">Paypal</span>
                            <input type="radio" name="payment" />
                        </div>
                        <div className="bg-smoke-white mb-2 rounded p-2 d-flex d-justify-space-between">
                            <span className="f-500 font-16 l-20">Master Card</span>
                            <input type="radio" name="payment" />
                        </div>
                        <div className="bg-smoke-white mb-2 rounded p-2 d-flex d-justify-space-between">
                            <span className="f-500 font-16 l-20">WiPay (TT Cards only )</span>
                            <input type="radio" name="payment" />
                        </div>
                        <div className="bg-smoke-white mb-2 rounded p-2 d-flex d-justify-space-between">
                            <span className="f-500 font-16 l-20">Wallet Points</span>
                            <input type="radio" name="payment" />
                        </div>
                    </div>
                    <div className="d-flex l-20 ">
                        <span className="font-16 f-600 l-20 text-primary mr-1">Add new card </span>
                        <Plus></Plus>
                    </div>
                </div>
                <div className={` pl-2`}>
                    <h2 className="l-40 font-700 text-primary mb-1">Booking Summary</h2>
                    <h4 className="l-20 font-700 mt-5 mb-2">Payment Details</h4>
                    <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                        <span>Ticket price</span>
                        <span className="text-light-grey">TT$ 100</span>
                    </div>
                    <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                        <span>Voucher</span>
                        <span className="text-success">-TT$.10</span>
                    </div>
                    <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-500">
                        <span>Booking fees</span>
                        <span className="text-light-grey">TT$ 100</span>
                    </div>
                    <div className="d-flex d-justify-space-between d-align-center font-16 l-24 f-600">
                        <span>Total payment</span>
                        <span className="text-light-grey">TT$ 100</span>
                    </div>
                    <div className=" mt-4 ">
                        <button type="submit" className="btn btn-primary cursor-pointer mt-1 btn-large">Confirm your booking</button>
                    </div>
                    
                </div> 
            </form>  
        </div>
        <div className={`container pt-5`}>    
            <h2 className="f-500 l-40 mt-5 mb-5">Similar Events</h2>
            <Cards></Cards>
        </div>
        {voucher && <VoucherModal handler={voucherHandler}></VoucherModal>}
    </>
       
   
  )
}
