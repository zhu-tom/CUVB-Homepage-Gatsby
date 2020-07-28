import React from 'react';
import { Link } from '@reach/router';

const items = {
    '/admin':"Dashboard",
    '/add':"Add",
    '/build':"Build",
    '/events':"Events",
    '/edit':"Edit",
    '/attendees':"Attendees",
}

export default function Breadcrumb({ location, children }) {
    let paths = location.pathname.split(/(?=\/)/);
    if (paths[paths.length-1] === "/") paths.splice(paths.length-1, 1);
    return (
        <div className="section pb-0">
            <div className="container">
                <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                    <ul>
                        {
                            paths.map((path, index) => {
                                return (
                                    <li key={index} className={index === paths.length - 1 ? "is-active":""}><Link to={paths.slice(0, index+1).join("")}>{items[path] || path.slice(1)}</Link></li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}