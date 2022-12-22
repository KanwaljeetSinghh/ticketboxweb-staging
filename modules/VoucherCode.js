import Moment from "react-moment";
export default function VoucherCode(props){
    return (
        <div className="border pt-1 pb-1 mt-3 pl-2 pr-2 rounded">
            <h4 className="f-700 l-23 m-0 ">{props.data.name}</h4>
            <span className="font-14 f-400 l-24 text-light-grey">Valid till <Moment utc format="D MMM">{props.data.endDate}</Moment></span>
            <div className="d-flex d-align-center d-justify-space-between">
                <span className="font-14 f-600 l-24 text-grey p-1 pl-2 pr-2 rounded mt-1 mb-1 border-dotted">{props.data.code}</span>
                <span className="text-primary font-16 l-24 f-600 cursor-pointer" onClick={props.addCoupon} id={props.data.code}>Apply</span>
            </div>
            <span className="font-12 f-600 l-24 text-primary">{props.data.description}</span>
        </div>
    );
}