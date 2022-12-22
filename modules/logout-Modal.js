import ModalAdjustWidth from "./Modal-adjust-width";
import useFirebaseAuth from "../auth/useFirebaseAuth";
export default function LogoutModal(props){
    const {signOut} = useFirebaseAuth();
    const submitHandler = () =>{
        signOut()
        .then(() => {
            props.handler();
            
        })
        .catch(error =>{
            console.log('error while logout '+error);
        })
        
    }
    return (
        <div className={props.classes} id={props["modal-id"]}>
            <ModalAdjustWidth align="centered">
                <div className="p-2">
                    <span className="f-500 font-16 l-24">Are you sure you want to Logout?</span>
                    <div className="d-flex d-justify-space-between mt-3 gap-1">
                        <a  className="btn-modal cursor-pointer border-primary rounded text-gradient" onClick={props.remainLogin}>No</a>
                        <button className="border-none cursor-pointer btn-modal bg-gradient rounded  text-white" onClick={submitHandler}>Yes</button>
                    </div> 
                </div>
            </ModalAdjustWidth>
        </div>
    );
}