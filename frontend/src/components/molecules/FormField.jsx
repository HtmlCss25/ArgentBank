import React from "react";

const FormField = ({type, id, label, disabled, value, handleChange})=>{

    if(type==="checkbox"){
        return(
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
        )
    }

    return(
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} disabled={disabled} value={value} onChange={handleChange}/>
        </div>
    )

}

export default FormField;