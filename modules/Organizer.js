import styles from "./css/organizer.module.css";
import Favourite from "../icons/favourite";
import { getOnBoardFromCookie } from "../auth/userCookies";
import Circle from "./circle";
import {useEffect, useState} from "react";
import Loader from "./Loader";
function Organizer(props){
    const token = getOnBoardFromCookie();
    const partner = props.data.partner._id;
    const [status, setStatus] = useState(props.data.partner.favorite);
    const [loading,setLoading] = useState(false)
    const handler = () =>{
        setStatus(prev => !prev)
        favoriteHandler()
    }
    let type = "";
    if(typeof(status) == "string"){
        if(status == "true"){
            type = "remove";
        }
        else{
            type = "add";
        }
    }
    if(typeof(status) == "boolean"){
        if(status == true){
            type = "remove";
        }
        else{
            type = "add";
        }
    }
    
    const favoriteHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "partner_id": partner,
            "type": type
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(process.env.URL+"/user/event/addFavorite", requestOptions)
        .then(response => response.json())
        .then(result => {
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
    
    return (
        <div className={`col-12 ${styles["orgazier__wrapper"]}`}>
            <span className="col-12 mb-0 font-28 f-700 l-20">About Organiser</span>
            <div className={`d-flex d-flex-wrap d-align-center d-justify-space-between mt-4 mb-4`}>
                <div className="d-flex d-align-center">
                    <img src={props.data.partner.imageUrl} className={`${styles["orgazier__avatar"]}`} />
                    <h5 className="m-0 tex-secondary f-500 l-24">
                        {props.data.partner.name}
                    </h5>
                </div>
                <div className="d-flex d-flex-wrap p-1 d-align-center btn-rounded small home-featured-tab active text-primary  user-select-none" onClick={handler}>
                    <span className="text-gradient font-14 f-400 mr-1">Favorite</span>
                    <Favourite status={status}></Favourite>
                </div>
                
            </div>
            {/* <p className={` f-500 font-16 l-20 text-grey`} style={{whiteSpace:"pre-line",lineHeight:"16px"}}>
                {props.data.description} 
            </p> */}
            {loading && <Loader/>}
        </div>
    )
}

export default Organizer;