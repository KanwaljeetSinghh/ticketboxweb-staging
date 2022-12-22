import { useState, useEffect } from "react";

const ToggleIconModal = (props) => {
    return (
        <label className="rectangle-modal">
            <input type="checkbox" onChange={props.handler}/>
            <span className="toggle-modal"></span>
        </label>
    )
}

export default ToggleIconModal;
 