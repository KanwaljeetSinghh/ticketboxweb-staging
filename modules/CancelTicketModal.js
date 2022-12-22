import ModalWithBg from "./Modal-with-bg";
import styles from './css/modal.module.css';
export default function CancelTicketModal(props){
    
    return (
        <ModalWithBg title="Cancel ticket" handler={props.handler}>
            
                <div className="d-flex d-flex-column">
                    <div className={`d-flex d-justify-space-between mt-4 ${styles["cancel-ticket"]}`}>
                        <div className="d-flex">
                            <img src="/images/cards.png"/>
                            <div className="d-flex d-flex-column ml-2">
                                <h4 className="l-24 f-600 m-0">Coldplay Ticket</h4>
                                <span className="font-14 l-20 f-500 text-light-grey">Friday, 20 June 2021</span>
                            </div>
                        </div>
                        <span className="f-700 l-24 ml-5 font-20 text-primary">TT$.100</span>
                    </div>
                    <h4 className="l-20 f-700 mt-4">Details</h4>
                    <div className="d-flex d-justify-space-between mt-1">
                        <span className="font-16 l-24 f-500">Tocket Nos</span>
                        <span className="font-16 l-24 f-500 text-light-grey">2 Ticket</span>
                    </div>
                    <div className="d-flex d-justify-space-between mt-1">
                        <span className="font-16 l-24 f-500">Voucher</span>
                        <span className="font-16 l-24 f-500 text-light-grey">TT$.10</span>
                    </div>
                    <div className="d-flex d-justify-space-between mt-1">
                        <span className="font-16 l-24 f-500">Booking fees</span>
                        <span className="font-16 l-24 f-500 text-light-grey">TT$ 10</span>
                    </div>
                    <div className="d-flex d-justify-space-between mt-1">
                        <span className="font-16 l-24 f-600">Total payment</span>
                        <span className="font-16 l-24 f-600 ">TT$ 100</span>
                    </div>
                    <div className="d-flex d-align-center d-justify-space-between  mt-5">
                        <h4 className=" l-20 f-700 m-0">Refund method</h4>
                        <span className="font-14 l-20 f-600 text-primary">Change</span>
                    </div>
                    <div className="border rounded p-2 mt-3 d-flex d-align-center d-justify-space-between">
                        
                        <span className="font-16 l-24 f-500 ml-2">Paypal</span>
                        <input type="radio"></input>
                    </div>
                    
                    <a  className="cursor-pointer bg-white btn btn-default-width border-primary rounded mt-5" onClick={props.cancelSuccessHandler}>Cancel Ticket</a>
                </div> 
            
        </ModalWithBg>
    );

}