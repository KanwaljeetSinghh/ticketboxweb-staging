import {useEffect,useState} from 'react'
import styless from "../../../modules/css/header.module.css";
import { getPaymentDetailCookie,removePaymentDetailCookie } from '../../../auth/userCookies';
import Loader from '../../../modules/Loader';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOnBoardFromCookie } from '../../../auth/userCookies';
import VerifySuccess from '../../../modules/VerifySuccess-Modal';
import Link from 'next/link';
export default function Response() {
    const router = useRouter();
    const detail = getPaymentDetailCookie();
    const [loading, setLoading] = useState(false)
    const [verifySuccessModal,setVerifySuccessModal] = useState(false)
    const [bookingId,setBookingId] = useState(null)

    const successToBookingPageHandler = () => {
        setLoading(true)
        router.push(`/user/bookingDetails/${bookingId}`)
        setVerifySuccessModal(false)
    }
    useEffect(()=>{
        setLoading(true)
        const token = getOnBoardFromCookie();
        const paymennt = router.query;
        let query = {}
        const isForOther = detail.isForOther;
        if(isForOther){
            query = {
                "event_id": detail.event_id,
                "tickets": detail.tickets,
                "slot": detail.slot,
                "totalAmount": detail.totalAmount,
                "fees": detail.fees,
                "isForOther": detail.isForOther,
                "separateDetails":{
                    "email":detail.separateDetails.email,
                    "name":detail.separateDetails.name,
                    "phone":detail.separateDetails.phone
                },
                "paymentType": detail.paymentType,
                "useWallet": detail.useWallet,
                "coupon":detail.coupon,
                "paymentDetail":{
                    "card":paymennt.card,
                    "currency":paymennt.currency,
                    "customer_name":paymennt.customer_name,
                    "data":paymennt.data,
                    "date":paymennt.date,
                    "order_id":paymennt.order_id,
                    "total":paymennt.total,
                    "status":paymennt.status,
                    "transaction_id":paymennt.transaction_id,
                    "message":paymennt.message,
                    "hash":paymennt.hash
                }
            }
        }
        else{
            query = {
                "event_id": detail.event_id,
                "tickets": detail.tickets,
                "slot": detail.slot,
                "totalAmount": detail.totalAmount,
                "fees": detail.fees,
                "isForOther": detail.isForOther,
                "paymentType": detail.paymentType,
                "useWallet": detail.useWallet,
                "coupon":detail.coupon,
                "paymentDetail":{
                    "card":paymennt.card,
                    "currency":paymennt.currency,
                    "customer_name":paymennt.customer_name,
                    "data":paymennt.data,
                    "date":paymennt.date,
                    "order_id":paymennt.order_id,
                    "total":paymennt.total,
                    "status":paymennt.status,
                    "transaction_id":paymennt.transaction_id,
                    "message":paymennt.message,
                    "hash":paymennt.hash
                }
            }
        }
        console.log(query)
        console.log(paymennt.status)
        console.log(typeof(paymennt.status))
        if(paymennt.status == "success"){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(query);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/booking/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status){
                    setLoading(false)
                    setVerifySuccessModal(true)
                    setBookingId(result.data._id)
                }
                else{
                    setLoading(false)
                    toast.error(result.msg,{
                        toastId:"em-10"
                    })
                }
            })
        }
        else{
            setLoading(false)
            toast.error("Payment failed!",{
                toastId:"em-10"
            })
        }
        
        document.getElementById("header").classList.add(styless["fixed-header"]);

    },[])
    return (
        <div>
            <div className={`container p-3 col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex-wrap d-flex d-justify-center  text-center`}>
                <img src="/images/error-image.png" />
                <h2 className="col-12 l-40 f-700 m-0 mt-5 text-gradient">Oops!</h2>
                <h4 className="col-12 l-27 f-500 m-0 mt-2 text-grey">Transaction has not been done due to some server issue.</h4>
                <Link href="/"><a className='col-12 mt-5'><h4 className="col-12 l-23 f-700 btn btn-primary text-grey mb-0 cursor-pointer">Back to Home</h4></a></Link>
            </div>
            {loading && <Loader/>}
            <ToastContainer
                toastClassName={styless["toaster-message"]}
                position={'top-right'}
                hideProgressBar={false}
                closeOnClick={true}
                draggable={true}
            ></ToastContainer>
            {verifySuccessModal && <VerifySuccess title="Congratulations" subtitle={`You successfully completed your booking for ${detail.title} event. Check your mail for booking details`} button="View Ticket" handler={successToBookingPageHandler}/>}

        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}