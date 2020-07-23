import React from 'react';

export default function FormField(props) {
    return (
        <div class="field">
            {props.label && <label class="label">{props.label}</label>}
            {props.children}
        </div>
    );
}