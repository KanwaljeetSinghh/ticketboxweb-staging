import Banner from "../modules/Banner";
import Card from "../modules/Card";
import SectionHeading from "../modules/Section-Heading";
import FeaturedTabs from "../modules/featured-Tabs";
import { useState, useEffect } from "react";
import styles from '../modules/css/header.module.css';
import useFirebaseAuth from "../auth/useFirebaseAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserFromCookie,getOnBoardUserFromCookie,getOnBoardFromCookie } from "../auth/userCookies";
import { useRouter,Router } from "next/router";
import Loader from "../modules/Loader";
export default function Home(props) {
  const {authUser} = useFirebaseAuth();
  const user = getOnBoardUserFromCookie();
  const router = useRouter();
  const token = getOnBoardFromCookie();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const tabs = [{name:"All",keyword:"all"}, {name:"Top Cities",keyword:"topCites "}, {name:"Top Events",keyword:"topEvents"}];
  
  const tabsHandler = (event) =>{
    var tabs = document.querySelectorAll(".index.home-featured-tab.active");
    tabs.forEach((item)=>{
      item.classList.remove("active");
    });
    event.target.classList.add("active");
    const val = event.target.getAttribute("keyword");
    filterData(val);
  }
  const filterData = (tab) =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(process.env.URL+"/event/list?city=all&tab="+tab, requestOptions)
    .then(response => response.json())
    .then(result => {
        setData(result)
      }
    )
    .catch(error => console.log('Error While filtering', error));
  }
  useEffect(()=>{
    if(token){
      router.push("/user");
    }
    setData(props.data);
    document.getElementById("header").classList.remove(styles["fixed-header"]);
  },[authUser]);
  
  return (
    <>
      <Banner auth={false}></Banner>
      {data.status && <>
        <div className={`container d-flex-wrap explore-events`} id="explore-events">
          <SectionHeading title="Explore Events"></SectionHeading>
          <FeaturedTabs classes="index large " data={tabs} handler={tabsHandler}></FeaturedTabs>
          <div className={styles["list-grid"]}>
            {data.events.map((item,index)=> <Card key={index} data={item}></Card>)}
          </div>
        </div>
      </>}
      <ToastContainer
          className={"toaster"}
          position={'top-right'}
          hideProgressBar={false}
          closeOnClick={true}
          draggable={true}
      ></ToastContainer>
      {loading && <Loader/>}
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch('https://api.ticketboxonline.com/api/v1/event/list?city=all', { 
    method: 'GET', 
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { 
    data:data,
  }}
}