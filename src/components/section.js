import React from 'react';

export default function Section({ myRef, children, hasBgBis}) {
    return (
        <section ref={myRef} className={`section ${hasBgBis ? 'has-background-white-bis':''}`}>
            <div className="container">
                {children}
            </div>
        </section>
    );
}