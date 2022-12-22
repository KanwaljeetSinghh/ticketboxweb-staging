import Modal from "./Modal";
import styles from "../modules/css/modal.module.css";
import ModalImage from "./Modal-Image";
import { getOnBoardFromCookie } from "../auth/userCookies";
export default function TagsModal(props){
    const token = getOnBoardFromCookie();
    const tagFormHandler = (e) =>{
        let selectedTags = [];
        const values = document.querySelectorAll(".tagItem-1");
        values.forEach(item =>{
            selectedTags.push(item.getAttribute("key-value"));
        })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "tags": selectedTags
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.URL+"/user/update/tags", requestOptions)
        .then(response => response.json())
        .then(result => {
            props.handler();
        })
        .catch(error => console.log('error', error));
        e.preventDefault();
    }
    return (
        <Modal modalClass="modal-tags" cross="yes" handler={props.tagHandler}>
            <form onSubmit={tagFormHandler}>
                <div className={`d-flex d-flex-column gap-1 ${styles["centered"]}`} >
                    <h4 className={`f-600 l-23 m-0 ${styles["modal-tags-heading"]} `}>Select Tags</h4>
                    <div className={`d-grid ${styles["image__grid"]}`}>
                        {props.data.map((item, index) =>{
                            return <ModalImage classes="tagItem" key={index} src={item.image} title={item.name} subtitle="2k events" color="transparent" fillcolor="white" idValue={item._id} ></ModalImage> 
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