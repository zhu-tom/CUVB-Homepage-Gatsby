import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormIcon(props) {
    return (
        <span onClick={props.onClick} className={`icon ${props.isLeft && 'is-left'} ${props.isRight && 'is-right'} ${props.className}`}>
            <FontAwesomeIcon icon={props.icon}/>
        </span>
    )
}