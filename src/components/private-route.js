import React from 'react';
import { isLoggedIn, getUser } from '../services/auth';
import { navigate } from 'gatsby';
import PropType from 'prop-types';

export default function PrivateRoute({ component: Component, allow, location, ...rest }) {
    if ((!isLoggedIn() && location.pathname !== "/login") || (allow === "admin" && getUser().email !== "admin")) {
        navigate("/login");
        return null;
    }
    
    return (
        <Component {...rest}/>
    );
}

PrivateRoute.propTypes = {
    component: PropType.any.isRequired,
    allow: PropType.oneOf(["user", "admin"]),
}