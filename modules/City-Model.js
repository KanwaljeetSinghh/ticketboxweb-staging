import Modal from "./Modal";
import styles from "../modules/css/modal.module.css";
import ModalImage from "./Modal-Image";
import { getOnBoardFromCookie } from "../auth/userCookies";
export default function CityModal(props){
    const token = getOnBoardFromCookie();
    const cityFormHandler = (e) =>{
        let selectedCities = [];
        const values = document.querySelectorAll(".cityItem-1");
        values.forEach(item =>{
            selectedCities.push(item.getAttribute("key-name"));
        })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "cites": selectedCities
        });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch(process.env.URL+"/user/update/cites", requestOptions)
        .then(response => response.text())
        .then(result => {
            props.handler();
        })
        .catch(error => console.log('error', error));
        e.preventDefault();
    }
    return (
        <Modal modalClass="modal-tags" cross="yes" handler={props.cityHandler}>
           <form onSubmit={cityFormHandler}>
                <div className={`d-flex d-flex-column gap-1 ${styles["centered"]}`} >
                    <h4 className={`f-600 l-23 m-0 ${styles["modal-tags-heading"]} `}>Add Cities</h4>
                    <div className={`d-grid ${styles["image__grid"]} gap-2`}>
                        {props.data.map((item, index) =>{
                            return <ModalImage classes="cityItem" key={index} src={item.image} title={item.name} subtitle="2k events" color="transparent" fillcolor="white" idValue={item._id}></ModalImage> 
                        })}
                    </div>
                    <div className={styles["modal-tags-buttons"]}>
                        <button type="submit" className="border-none cursor-pointer btn btn-primary btn-default-width ">Continue</button>
                        <button className="btn bg-white border-primary btn-default-width f-500 font-14 l-16 text-center cursor-pointer" onClick={props.handler}>Skip</button>
                    </div>
                </div>
            </form>
        </Modal> 
    );
}