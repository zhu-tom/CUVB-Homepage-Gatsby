import React from 'react';
import { isLoggedIn, getUser } from '../services/auth';
import { navigate } from 'gatsby';
import PropType from 'prop-types';
import { useEffect } from 'react';

export default function PrivateRoute({ component: Component, allow, location, ...rest }) {
    useEffect(() => {
        if ((!isLoggedIn() && location.pathname !== "/login") || (allow === "admin" && getUser()._id !== process.env.GATSBY_ADMIN_ID)) {
            navigate("/login");
            return null;
        }
    });
    
    return (
        <Component {...rest}/>
    );
}

PrivateRoute.propTypes = {
    component: PropType.any.isRequired,
    allow: PropType.oneOf(["user", "admin"]),
}