import React from "react";

const FeatureItem = ({image,title,content})=>{


    return(
        <div className="feature-item">
            <img src={image} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {content}
            </p>
        </div>
    )

}

export default FeatureItem;