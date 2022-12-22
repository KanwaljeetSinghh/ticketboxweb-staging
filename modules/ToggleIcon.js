import { useState, useEffect } from "react";

const ToggleIcon = (props) => {
    return (
        <label className="rectangle">
            <input type="checkbox"  onChange={props.handler}/>
            <span className="toggle"></span>
        </label>
    )
}

export default ToggleIcon;
 