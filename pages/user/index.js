import Banner from "../../modules/Banner";
import Cards from "../../modules/Cards";
import Card from "../../modules/Card";
import SectionHeading from "../../modules/Section-Heading";
import FeaturedTabs from "../../modules/featured-Tabs";
import { useState, useEffect,useRef } from "react";
import styles from '../../modules/css/header.module.css';
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import { getUserFromCookie,setUserCookie,getOnBoardFromCookie } from "../../auth/userCookies";
import { useRouter,Router } from "next/router";
import Loader from "../../modules/Loader";
export default function Home(props) {
  const { authUser } = useFirebaseAuth();
  let queryRef = useRef(false)
  const token = getOnBoardFromCookie();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const [mySuggestions,setMySuggestions] = useState([]); 
  const router = useRouter();
  const tabsAuth = [{name:"All",keyword:"all"}, {name:"Top Cities",keyword:"topCites "}, {name:"Top Events",keyword:"topEvents"}, {name:"My Suggestions",keyword:"mySuggestions"}];
  const tabsHandler = (event) =>{
    var tabs = document.querySelectorAll(".index.home-featured-tab.active");
    tabs.forEach((item)=>{
      item.classList.remove("active");
    });
    event.target.classList.add("active");
    const val = event.target.getAttribute("keyword");
    if(val == "mySuggestions"){
     const position = document.getElementById("suggested-events").offsetTop;
     window.scrollTo({
        top:position,
        behaviour:'smooth'
     })
    }
    else{
      filterData(val);
    }
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
  const SuggestionsFilter = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.URL+"/user/event/list?city=all&tab=mySuggestions", requestOptions)
      .then(response => response.json())
      .then(result => {
        setMySuggestions(result.events);
      }
    )
    .catch(error => console.log('error', error));
  }
  useEffect(()=>{
    
    if(token == null){
      router.push("/");
    }
    if(token){
      if(!queryRef.current){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(process.env.URL+"/user/event/list?city=all", requestOptions)
          .then(response => response.json())
          .then(result => {
            setData(result);
          }
        )
        .catch(error => console.log('error', error));
        SuggestionsFilter();
      }
      queryRef.current = true ;
    }
    document.getElementById("header").classList.remove(styles["fixed-header"]);
  },[authUser]);

  if(data == null){
    return <></>
  }
  return (
    <>
      <Banner auth={true}></Banner>
      {data.status && <>
        <div className={`container d-flex-wrap explore-events`} id="explore-events">
          <SectionHeading title="Explore Events"></SectionHeading>
          <FeaturedTabs classes="index large " data={tabsAuth} handler={tabsHandler}></FeaturedTabs>
          <div className={styles["list-grid"]}>
            {data.events.map((item,index)=> <Card key={index} data={item}></Card>)}
          </div>
        </div>
      </>}
      <div className={`container d-flex-wrap `} id="suggested-events">
        <SectionHeading  title="My Suggestions" classes="mb-5"></SectionHeading>
        {mySuggestions && mySuggestions.length == 0 && <h3 className="text-light-grey f-700 text-center">No <span className="text-primary">event</span> here yet</h3>}
        {authUser && mySuggestions && mySuggestions.length > 0 && <>
            <Cards data={mySuggestions}></Cards>
          </>
        }
      </div>
      {loading && <Loader/>}
    </>
  )
}

// export async function getServerSideProps() {
//   const res = await fetch(process.env.URL+'/event/list?city=all', { 
//     method: 'GET', 
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     })
//   });
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { 
//     data:data,
//   } }
// }