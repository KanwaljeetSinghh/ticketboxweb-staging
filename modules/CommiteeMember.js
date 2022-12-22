import Modal from "./Modal";

export default function CommiteeMember(props){
    return (
        <Modal modalClass="modal-sign" >
            <div className={`d-flex d-flex-column d-align-center pb-5`} >
                <h4 className="f-600 l-23 text-center mb-4">Committee Member</h4>
                <img src="/images/Congrats.png" />
                <h4 className="f-700 l-32 mt-5 m-0">Congratulations</h4>
                <span className="f-600 font-13 l-20 text-grey text-center">Event request {props.title} successfully.</span>
                <a className="btn btn-primary btn-default-width mt-3 mb-5">Back</a>
            </div>
        </Modal>
    );
}