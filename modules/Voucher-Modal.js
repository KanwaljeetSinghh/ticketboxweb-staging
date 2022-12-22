import Modal from "./Modal";
import styles from "./css/modal.module.css";
import VoucherCode from "./VoucherCode";
import { useEffect,useRef,useState } from "react";
import { getOnBoardFromCookie } from "../auth/userCookies";
import Loader from "./Loader";
export default function VoucherModal(props){
    const token = getOnBoardFromCookie();
    let queryRef = useRef(false)
    const [data, setData] = useState(null)
    useEffect(()=>{
        if(!queryRef.current)
        {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/coupon/list", requestOptions)
            .then(response => response.json())
            .then(result => setData(result.coupons))
            .catch(error => console.log('error', error));
            
        }
        queryRef.current = true ;
    })
    if(data == null){
        return <Loader/>
    }
    return (
        <Modal modalClass="modal-voucher" cross="yes" handler={props.handler}>
            <div className={`d-flex d-flex-column pb-5`} >
                <h3 className="f-700 l-20 mb-5 ">Available Voucher</h3>
                <div className={`d-flex d-justify-space-between border-bottom mb-1 d-align-center ${styles["voucher"]}`}>
                    <input type="text" placeholder="Enter voucher code here"></input>
                    <span className="text-primary font-14 l-24 f-600">Apply</span>
                </div>
                {data.map((item,index)=>{ return <div key={index}>
                        <VoucherCode data={item} addCoupon={props.addCoupon}></VoucherCode>
                    </div>
                })}
                
                

            </div>
        </Modal>
    );
}