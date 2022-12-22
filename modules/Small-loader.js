import styles from './css/modal.module.css'
import { ClipLoader, PulseLoader } from 'react-spinners';

export default function SmallLoader(props){
    
    if(props.type==0)
    {
        return (
            <ClipLoader size={15} color="#FFF"></ClipLoader>
        );
    }
    if(props.type==1)
    {
        return (
        <div className={`d-flex d-justify-center`}>
            <PulseLoader size={20} color="#5D48D0"></PulseLoader>
        </div>
        );
    }
}