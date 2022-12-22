import { useEffect,useState,useRef } from "react";
import Card from "../modules/Card";
import styless from "../modules/css/header.module.css";
import styles from "../modules/css/filter.module.css";
import CrossFilter from "../icons/cross-filter";
import StarBold from "../icons/Star-bold";
import Loader from "../modules/Loader";
import { useRouter,Router } from "next/router";
import Link from "next/link";
export default function FilterResult(){
    const router = useRouter();
    let queryRef = useRef(false)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [dataQuery, setDataQuery] = useState([]);
    const queryHandler = (e) => {
        let query = "";
        let parameter = e.currentTarget.getAttribute("value");
        let paramsArr = dataQuery.filter((item,index) => item.key != parameter)
        if(parameter == "city"){
            paramsArr.push({
                key:"city",
                value:'all'
            });
        }
        paramsArr.forEach((item,index)=>{
            query = query + "&"+item.key+"="+item.value;
        });
        setDataQuery(paramsArr);
        query = query.substring(1);
        router.push("?"+query)
        fetchData(query);
    }
    const queryPriceHandler = (e) => {
        let query = "";
        let parameter = e.currentTarget.getAttribute("value");
        let parameter2 = e.currentTarget.getAttribute("val");
        let paramsArr = dataQuery.filter((item,index) => item.key != parameter )
        paramsArr.forEach((item,index)=>{
            query = query + "&"+item.key+"="+item.value;
        });
        let paramsArr2 = paramsArr.filter((item,index) => item.key != parameter2 )
        query = ""
        paramsArr2.forEach((item,index)=>{
            query = query + "&"+item.key+"="+item.value;
        });
        setDataQuery(paramsArr2);
        query = query.substring(1);
        router.push("?"+query)
        fetchData(query);
    }
    const obj = router.query;

    useEffect(()=>{
        document.getElementById("header").classList.add(styless["fixed-header"]);
        if(obj){
            let paramsArr = [];
            let query = "";
            if(obj.hasOwnProperty("city")){
                paramsArr.push({
                    key:"city",
                    value:obj.city
                });
            }
            else{
                paramsArr.push({
                    key:"city",
                    value:"all"
                });
            }
            if(obj.hasOwnProperty("tag")){
                paramsArr.push({
                    key:"tag",
                    value:obj.tag
                });
                paramsArr.push({
                    key:"tagName",
                    value:obj.tagName
                });
            }
            if(obj.hasOwnProperty("minPrice")){
                paramsArr.push({
                    key:"minPrice",
                    value:obj.minPrice
                });
            }
            if(obj.hasOwnProperty("maxPrice")){
                paramsArr.push({
                    key:"maxPrice",
                    value:obj.maxPrice
                });
            }
            if(obj.hasOwnProperty("RequestEvent")){
                paramsArr.push({
                    key:"RequestEvent",
                    value:obj.RequestEvent
                });
            }
            if(obj.hasOwnProperty("rating")){
                paramsArr.push({
                    key:"rating",
                    value:obj.rating
                });
            }
            setDataQuery(paramsArr);
            paramsArr.forEach((item,index)=>{
                query = query + "&"+item.key+"="+item.value;
            });
            fetchData(query);
        }
        queryRef.current = true ;
    },[obj]);

    const fetchData = (query) => {
        // Preparing query for filteration
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/event/list?"+query, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result.events)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }

    if(!data || !obj){
        return <Loader/>
    }
    return (
        <div className="container">
            <div className="d-flex d-align-center">
                <Link href="/filters"><a className="cursor-pointer mr-3">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.704992 7.82811L5.65166 12.7748C5.76012 12.8841 5.88915 12.9709 6.03132 13.0301C6.17349 13.0894 6.32598 13.1199 6.47999 13.1199C6.63401 13.1199 6.7865 13.0894 6.92866 13.0301C7.07083 12.9709 7.19987 12.8841 7.30833 12.7748C7.52562 12.5562 7.64758 12.2605 7.64758 11.9523C7.64758 11.6441 7.52562 11.3484 7.30833 11.1298L3.17832 6.99977L7.30833 2.86977C7.52562 2.65119 7.64758 2.35549 7.64758 2.04727C7.64758 1.73906 7.52562 1.44336 7.30833 1.22477C7.19931 1.11664 7.07003 1.0311 6.92788 0.973041C6.78574 0.914983 6.63353 0.885553 6.47999 0.886441C6.32645 0.885553 6.17425 0.914983 6.0321 0.973041C5.88996 1.0311 5.76067 1.11664 5.65166 1.22477L0.704992 6.17144C0.595642 6.2799 0.508849 6.40893 0.449619 6.5511C0.390389 6.69327 0.359894 6.84576 0.359894 6.99977C0.359894 7.15379 0.390389 7.30628 0.449619 7.44845C0.508849 7.59062 0.595642 7.71965 0.704992 7.82811Z" fill="#875ECD"/>
                    </svg>
                </a></Link>
                <h2 className="l-44 mb-0 f-700 text-gradient">Filters result</h2>
            </div>
            <div className="d-flex d-flex-wrap gap-4 mb-75 mt-2">
                {obj.hasOwnProperty("city") && obj.city != "all" && <div className="d-flex gap-4 p-1-h pl-2 pr-2 bg-white rounded border d-align-center" >
                    <span className="f-600 font-16 l-24 text-grey d-align-center"> {obj.city} </span>
                    <div className="d-flex d-align-center" onClick={queryHandler} value="city">
                        <CrossFilter></CrossFilter>
                    </div>
                </div>}
                {obj.hasOwnProperty("minPrice") && <div className="d-flex gap-4 p-1-h pl-2 pr-2 bg-white rounded border d-align-center" >
                    <span className="f-600 font-16 l-24 text-grey d-align-center">$ &nbsp; {obj.minPrice} {obj.hasOwnProperty("minPrice") && "-"} {obj.maxPrice}</span>
                    <div className="d-flex d-align-center" onClick={queryPriceHandler} value={`minPrice`} val="maxPrice">
                        <CrossFilter></CrossFilter>
                    </div>
                </div>}
                {obj.hasOwnProperty("tag") && <div className="d-flex gap-4 p-1-h pl-2 pr-2 bg-white rounded border d-align-center">
                    <span className="f-600 font-16 l-24 text-grey d-align-center"> {obj.tagName} </span>
                    <div className="d-flex d-align-center" onClick={queryPriceHandler} value={`tag`} val={`tagName`}>
                        <CrossFilter></CrossFilter>
                    </div>
                </div>}
                {obj.hasOwnProperty("rating") && <div className="d-flex gap-2 p-1-h pl-1 pr-1 bg-white rounded border d-align-center">
                    <StarBold></StarBold>
                    <span className="f-600 font-16 l-24 text-grey d-align-center"> {obj.rating} +</span>
                    <div className="d-flex d-align-center" onClick={queryHandler} value="rating">
                        <CrossFilter></CrossFilter>
                    </div>
                </div>}
                {obj.hasOwnProperty("RequestEvent") && <div className="d-flex gap-2 p-1-h pl-1 pr-1 bg-white rounded border d-align-center" >
                    <span className="f-600 font-16 l-24 text-grey d-align-center"> {obj.RequestEvent == 1 ? "Requested Events":"Public Events"} </span>
                    <div className="d-flex d-align-center" onClick={queryHandler} value={`RequestEvent`}>
                        <CrossFilter></CrossFilter>
                    </div>
                </div>}
            </div>
            {data.length == 0 && <h5 className="col-12 d-flex d-justify-center f-700">No events here yet!</h5>}
            <div className={styless["list-grid"]}>
             {data.length > 0 && data.map((item,index)=><Card key={index} data={item}></Card>)}
            </div>
            {loading && <Loader/>}
        </div>
    );

}