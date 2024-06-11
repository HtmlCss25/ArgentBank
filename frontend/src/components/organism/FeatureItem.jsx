import React from "react";

const FeatureItem = ({image,title,content})=>{


    return(
        <div class="feature-item">
            <img src="./img/icon-chat.png" alt="Chat Icon" class="feature-icon" />
            <h3 class="feature-item-title">{title}</h3>
            <p>
                {content}
            </p>
        </div>
    )

}