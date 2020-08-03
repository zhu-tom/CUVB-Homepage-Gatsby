import React from 'react';
import Navbar from './navbar';
import Menu from './admin-menu';
import Breadcrumb from './breadcrumb';

export default function Dashboard({children, location}) {
    return (
        <>
            <Navbar/>
            <div className="columns">
                <div className="column is-one-quarter">
                    <Menu/>
                </div>
                <div className="column">
                    <Breadcrumb location={location}/>
                    {children}
                </div>
            </div>
        </>
    );
}