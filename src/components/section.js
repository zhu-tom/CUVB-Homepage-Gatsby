import React from 'react';

export default function Section({ children, hasBgBis}) {
    return (
        <section className={`section ${hasBgBis && 'has-background-white-bis'}`}>
            <div className="container">
                {children}
            </div>
        </section>
    );
}