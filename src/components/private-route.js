import React from 'react';
import { isLoggedIn } from '../services/auth';
import { navigate } from 'gatsby';

export default function PrivateRoute({ component: Component, location, ...rest }) {
    if (!isLoggedIn() && location.pathname !== "/login") {
        navigate("/login");
        return;
    }
    
    return (
        <Component {...rest}/>
    );
}