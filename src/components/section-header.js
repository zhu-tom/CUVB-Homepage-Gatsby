import React from 'react';

export default function SectionHeader({ subtitleText, titleText, isNew }) {
    return (
        <>
            <h1 className="title">
                {titleText}
                {isNew && <span className="tag ml-2 is-primary"><b>New!</b></span>}
            </h1>
            {subtitleText && <p className="subtitle is-4">{subtitleText}</p>}
        </>
    );
}