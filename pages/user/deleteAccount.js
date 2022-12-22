import {useEffect,useState} from 'react'
import styles from "../../modules/css/header.module.css";
import Loader from "../../modules/Loader";
import useFirebaseAuth from '../../auth/useFirebaseAuth';
import { getOnBoardFromCookie,setOnBoardUserCookie } from '../../auth/userCookies';
import { useRouter } from 'next/router';
export default function DeleteAccount() {
    const router = useRouter();
    const {signOut} = useFirebaseAuth();
    const token = getOnBoardFromCookie();
    const [loading,setLoading] = useState(false)
    const deleteAccountHandler = (e) => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var raw = "";
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/delete", requestOptions)
        .then(response => response.json())
        .then(result => {
            signOut().then(()=>{});
            router.push('/')
        })
        .catch(error => console.log('error', error));
        e.preventDefault();
    }
    useEffect(()=>{
        document.getElementById("header").classList.add(styles["fixed-header"]);
      })
    return (
        <>
            {loading && <Loader/>}
            <div className='container bg-white p-5 rounded-20 d-flex d-flex-wrap d-align-center'>
                <h1 className='text-primary col-12 '>Delete Accont</h1>
                <span className="font-12 l-24 col-12 f-500 ">
                    Updated at 2022-08-04
                </span>
                <p className="font-12 l-24 mt-1 col-12 f-500 ">
                    Ticket Box (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Ticket Box.
                </p> 
                <p className="font-12 l-24 mt-1 col-12 f-500 ">
                This Privacy Policy applies to our website, and its associated subdomains (collectively, our “Service”) alongside our application, Ticket Box. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.
                </p> 
                <form onSubmit={deleteAccountHandler} className={`${styles["delete-account"]} col-12 col-sm-6 mt-3`}>
                    <div className='d-flex d-align-center'>
                        <input type="checkbox" required id="delete"/>
                        <label htmlFor="delete" className='ml-1'>Are you sure you want to delete account?</label>
                    </div>
                    <button type="submit" className=" btn mt-2 btn-default-width border-none btn-primary cursor-pointer">Delete Accont</button>
                </form>
            </div>
        </>
    )
}
