import React from 'react';

export default function Modal({children, isActive, onClose}) {
    return (
        <div className={`modal ${isActive ? 'is-active':''}`}>
            <div class="modal-background"></div>
            <div class="modal-content">
                {children}
            </div>
            <button class="modal-close is-large" onClick={onClose}aria-label="close"></button>
        </div>
    )
} 