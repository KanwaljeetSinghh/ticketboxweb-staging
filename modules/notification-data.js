import Moment from "react-moment";
export default function NotificationData(props){
    return (
        <div className="d-flex d-flex-column pt-2 pb-1 pl-1 pr-2 border-bottom">
            <div className="d-flex  d-justify-space-between d-align-center text-grey">
                <span className="font-14 l-20 f-500">&nbsp;</span>
                <span className="font-12 l-16 f-500">{<Moment fromNow={true}>{props.data.createdAt}</Moment>}</span>
            </div>
            <span className="font-14 mt-1 f-600 l-20">{props.data.title}</span>
            <span className="font-12 mt-1 f-500 l-20 text-light-grey">{props.data.body}</span>
        </div>
    );
}