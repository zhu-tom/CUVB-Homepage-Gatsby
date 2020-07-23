import React from 'react';

export default function Hero({titleText}) {
    return (
        <section className="hero is-bold is-primary is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container">
                    <p className="title">
                        {titleText}
                    </p>
                </div>
            </div>
        </section>
    );
}