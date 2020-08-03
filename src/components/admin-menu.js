import React from 'react';
import { Link } from '@reach/router';

const Navlink = props => (
    <Link
    {...props}
    getProps={({ isPartiallyCurrent }) => ({
        className: isPartiallyCurrent ? "is-active":""
    })}/>
);

export default function Menu() {
    return (
        <aside className="menu has-background-white-bis px-3 py-3">
            <h2 style={{textAlign: "center"}} className="title is-2">Admin</h2>
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><Navlink to="/admin/">Dashboard</Navlink></li>
                <li><a>Customers</a></li>
            </ul>
            <p className="menu-label">
                Administration
            </p>
            <ul className="menu-list">
                <li><Navlink to="/admin/build">Build</Navlink></li>
                <li>
                    <Navlink to="/admin/events">Events</Navlink>
                    <ul>
                        <li><Navlink to="/admin/events/add">Add</Navlink></li>
                        <li><Navlink to='/admin/events/attendees'>Attendees</Navlink></li>
                    </ul>
                </li>
                <li>
                    <Navlink to="/admin/users/">Users</Navlink>
                    <ul>
                        <li><a>Send Mail</a></li>
                    </ul>
                </li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
            </ul>
            <p className="menu-label">
                Transactions
            </p>
            <ul className="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
            </ul>
        </aside>
    );
}