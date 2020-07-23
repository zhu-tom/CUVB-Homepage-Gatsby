import React from 'react';

export default function Input(props) {
    return (
        <div className={`control ${props.leftIcon && 'has-icons-left'} ${props.rightIcon && 'has-icons-right'}`}>
            <input onChange={props.onChange} value={props.value} name={props.name} className={`input ${!props.isValid && 'is-danger'}`} type={props.type} placeholder={props.placeholder} disabled={props.disabled}/>

            {props.leftIcon}

            {props.rightIcon}

            {!props.isValid && <p className="help is-danger">{props.invalidMessage}</p>}
        </div>
    );
}