import Modal from "./Modal";
export default function LoginInstruction(props){
    return (
        <Modal modalClass="modal-sign" cross="yes" handler={props.handler}>
            <h4 className="f-400 text-center">You must <span className="text-primary f-700 cursor-pointer" onClick={props.login}>login</span> first before proceeding</h4>
        </Modal>
    );
}