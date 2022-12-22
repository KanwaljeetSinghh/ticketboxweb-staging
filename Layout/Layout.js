import { Fragment, useEffect, useState,createContext } from 'react';
import TCFooter from '../modules/Footer';
import Header from '../modules/Header';
import {getOnBoardFromCookie,getOnBoardUserFromCookie,setOnBoardUserCookie} from "../auth/userCookies";
import HeaderAuth from '../modules/HeaderAuth';
function Layout(props){
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(()=>{
        const onboard = getOnBoardUserFromCookie();
        setHasMounted(true);      
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(process.env.URL+"/admin/get/currencyConversion", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(!onboard){
                let user={
                    email: null,
                    name: null,
                    country:null,
                    countryCode:null,
                    phone: null,
                    photo: null,
                    emailVerifies: null,
                    isCommitteeMember: null,
                    referralCode: null,
                    rate: result.currencyConversion[1].conversionRate,
                    currency:"USD",
                }
                setOnBoardUserCookie(user);
            }
        })
        .catch(error => console.log('error', error));  
    },[]);

    if(!hasMounted){
        return (null)
    }
    const token = getOnBoardFromCookie();
    if(token){
        return (
            <Fragment>
                <HeaderAuth></HeaderAuth>
                <main>
                    {props.children}
                </main>
                <TCFooter></TCFooter>
            </Fragment>
        )
    }
    else{
        return (
            <Fragment>
                <Header></Header>
                <main className='user-select-none'>
                    {props.children}
                </main>
                <TCFooter></TCFooter>
            </Fragment>
        )
    }
}
export default Layout;
