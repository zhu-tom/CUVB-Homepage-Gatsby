import React from 'react';
import Layout from '../components/layout';
import Section from '../components/section';
import SectionHeader from '../components/section-header';
import { Router } from '@reach/router';
import PrivateRoute from '../components/private-route';
import Profile from '../components/profile';
import { isLoggedIn } from '../services/auth';
import { navigate } from 'gatsby';
import SEO from '../components/seo';
import { useEffect } from 'react';

export default function Account() {
    useEffect(() => {
        if (!isLoggedIn()) navigate("/login");
    });
    
    return (
        <Layout>
            <SEO title="My Account"/>
            <Profile/>
        </Layout>
    );
}