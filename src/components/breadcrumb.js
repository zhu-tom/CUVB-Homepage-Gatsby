import React from 'react';
import { Link } from '@reach/router';

const items = {
    '/admin':"Dashboard",
    '/add-event':"Add Event"
}

export default function Breadcrumb({ location, children }) {
    const paths = location.pathname.split(/(?=\/)/);
    return (
        <div className="section pb-0">
            <div className="container">
                <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                    <ul>
                        {
                            paths.map((path, index) => {
                                return (
                                    <li className={index === paths.length - 1 ? "is-active":""}><Link to={paths.slice(0, index+1).join()}>{items[path]}</Link></li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}