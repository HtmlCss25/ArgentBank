import React from "react";

import FeatureItem from "../organism/FeatureItem";

const Home = ()=>{

    const features = [
        {
            image : "./img/icon-chat.webp",
            title : "You are our #1 priority",
            content : "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
            image : "./img/icon-money.webp",
            title : "More savings means higher rates",
            content : "The more you save with us, the higher your interest rate will be!"
        },
        {
            image : "./img/icon-security.webp",
            title : "Security you can trust",
            content : "We use top of the line encryption to make sure your data and money is always safe."
        }
    ]

    return(
        <main>
            <div className="hero">
                <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {features.map((feature)=>{
                    return <FeatureItem key={feature.content} image={feature.image} title={feature.title} content={feature.content} />
                })}
            </section>
            </main>
    )

}

export default Home;