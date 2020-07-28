import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="footer has-background-white-ter">
            <div className="content has-text-centered">
                <p>
                <strong>Made with </strong><span className="icon"><FontAwesomeIcon icon={faCoffee}/></span> by <a href="https://zhutom.com">Tom Zhu</a>
                </p>
                <p>
                <span className="icon"><FontAwesomeIcon icon={faCopyright}/></span>{new Date().getFullYear()} Carleton University Volleyball Club
                </p>
            </div>
        </footer>
    );
}