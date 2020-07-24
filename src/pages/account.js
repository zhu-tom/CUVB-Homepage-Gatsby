import React from 'react';
import Layout from '../components/layout';
import Section from '../components/section';
import SectionHeader from '../components/section-header';
import { Router } from '@reach/router';
import PrivateRoute from '../components/private-route';
import Profile from '../components/profile';

export default function Account() {
    return (
        <Layout>
            <Router>
                <PrivateRoute path="/account" component={Profile}/>
            </Router>
        </Layout>
    );
}