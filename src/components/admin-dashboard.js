import React from 'react';
import Navbar from './navbar';
import Menu from './admin-menu';
import Breadcrumb from './breadcrumb';

export default function Dashboard({children, location}) {
    return (
        <>
            <Navbar/>
            <div class="columns">
                <div class="column is-one-quarter">
                    <Menu/>
                </div>
                <div class="column">
                    <Breadcrumb location={location}/>
                    {children}
                </div>
            </div>
        </>
    );
}