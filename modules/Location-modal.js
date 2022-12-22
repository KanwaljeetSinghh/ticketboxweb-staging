import ModalAdjustWidth from "./Modal-adjust-width";
import LocationBig from "../icons/LocationBig";

export default function LocationModal(props){
    const submitHandler = (e) =>{
        e.preventDefault();
        props.getLocation();
    }
    return (
        <div className={props.classes} id={props["modal-id"]}>
            <ModalAdjustWidth align="left">
                <form onSubmit={submitHandler}>
                    <div className="pt-2 d-flex d-align-center d-flex-column ">
                        <LocationBig></LocationBig>
                        <h3 className="f-700 l-28 m-0 text-center mt-2">Need your exact location</h3>
                        <button type="submit" className="border-none btn btn-primary btn-big rounded mt-2 cursor-pointer">Detect Location</button>
                        <span className="font-16 f-600 l-20 text-primary mt-2 cursor-pointer" onClick={props.handler}>Deny</span>
                    </div>
                </form>
            </ModalAdjustWidth>
        </div>
    );
}