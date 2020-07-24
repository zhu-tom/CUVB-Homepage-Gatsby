import React from 'react';
import PropType, { oneOf } from 'prop-types';

export default function Hero({titleText, subtitleText, size, children}) {
    return (
        <section className={`hero is-bold is-primary ${size && "is-"+size}`}>
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {titleText}
                    </h1>
                    <h2 className="subtitle">
                        {subtitleText}
                    </h2>
                </div>
            </div>
        </section>
    );
}

Hero.propTypes = {
    titleText: PropType.string,
    subtitleText: PropType.string,
    size: oneOf(["small", "medium", "large", "fullheight", "fullheight-with-navbar"]),
}