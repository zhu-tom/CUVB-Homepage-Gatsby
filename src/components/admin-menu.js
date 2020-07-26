import React from 'react';
import { Link } from '@reach/router';

const Navlink = props => (
    <Link
    {...props}
    getProps={({ isCurrent }) => ({
        className: isCurrent ? "is-active":""
    })}/>
);

export default function Menu() {
    return (
        <aside class="menu has-background-white-bis px-3 py-3">
            <h2 style={{textAlign: "center"}} class="title is-2">Admin</h2>
            <p class="menu-label">
                General
            </p>
            <ul class="menu-list">
                <li><Navlink to="/admin">Dashboard</Navlink></li>
                <li><a>Customers</a></li>
            </ul>
            <p class="menu-label">
                Administration
            </p>
            <ul class="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                    <a>Events</a>
                    <ul>
                        <li><Navlink to="/admin/add-event">Add</Navlink></li>
                        <li><a>Edit</a></li>
                        <li><a>Overview</a></li>
                    </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
            </ul>
            <p class="menu-label">
                Transactions
            </p>
            <ul class="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
            </ul>
        </aside>
    );
}