import '../styles/globals.css';
import '../styles/ticketbox.css';
import '../styles/structure.css';
import Layout from '../Layout/Layout';
import { setOnBoardUserCookie } from '../auth/userCookies';
import { useEffect, useState } from 'react';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  
  useEffect(()=>{
    document.addEventListener("click",(e)=>{
      if(e.target.closest(".modal-button")){
      }
      else{
        if(e.target.closest(".modal-class")){
        }
        else{
          let ele = document.querySelectorAll(".ticketbox-modal.modal-on");
          if(ele.length>0){
            ele.forEach((item)=>{
              item.classList.remove("modal-on");
            })
          }
        }
      }
    })
  },[]);

  return <>  
    <Head>
      <link rel="shortcut icon" href="/images/logo.png" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp;
