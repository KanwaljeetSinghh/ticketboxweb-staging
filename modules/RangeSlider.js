import { useState } from 'react';
import styles from './css/filter.module.css';
import {getOnBoardUserFromCookie} from '../auth/userCookies'
function RangeSlider(props){
    const user = getOnBoardUserFromCookie();
    let temp = 0;
    const min = Number(props.min);
    const max = Number(props.max);
    const perStep = (max-min); // Calculate the one percentage og whole
    const perStepWithoutFraction = Math.floor(perStep);
    const fraction = perStep - perStepWithoutFraction;// calculate the fraction part so that you can make a balence between them
    const [minVal,setMinVal] = useState(min);
    const [maxVal,setMaxVal] = useState(max);
    const [progressLeft,setProgressLeft] = useState("0");
    const [progressRight,setProgressRight] = useState("0");

    const minHandler = (e) =>{
        temp = Number(e.target.value);
        if(temp < Number(maxVal)){
            setMinVal(e.target.value);
            // temp = ((Number(minVal) - min ) * perStepWithoutFraction) - ((Number(minVal) - min ) * fraction) ;
            
            temp = ((Number(minVal) - min)*100) / perStep;
            temp = temp;
            setProgressLeft(temp);
            props.minHandler(e.target.value)
        }
         
    }
    const maxHandler = (e) =>{
        temp = Number(e.target.value);
        if(temp >= (Number(minVal))){
            setMaxVal(e.target.value);
            temp = -((Number(maxVal) - max)*100) / perStep;
            temp = (temp);
            setProgressRight(temp);
            props.maxHandler(e.target.value);
        }
    }

    return (
        <>
        {props.labels && <>
        <div className={`d-flex d-align-center  border-bottom pb-3`}>
            <h4 className='l-26 f-400 m-0 p-00 text-grey'>{user.currency == "USD"?"USD":"TT$"} {minVal}  -</h4>
            <h4 className='l-26 f-400 m-0 p-00 text-grey ml-1'>{user.currency == "USD"?"USD":"TT$"} {maxVal}</h4>
        </div>
        </>
        }
        <div className={`slider`}>
            <div className="progress" style={{left:`${progressLeft}%`,right:`${progressRight}%`}}>
            </div>
            <div className="range-input">
                <input type="range" className="range-min" min={props.min} max={props.max} step="1" value={minVal} onChange={minHandler}/>
                <input type="range" className="range-max" min={props.min} max={props.max} step="1" value={maxVal} onChange={maxHandler}/>                
            </div>
        </div>
        
                
        
        </>
    )
}

export default RangeSlider;