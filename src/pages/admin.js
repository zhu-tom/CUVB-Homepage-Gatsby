import React, { useEffect, useState } from "react";
import {Router} from "@reach/router";
import EventForm from "../components/event-form";
import Dashboard from "../components/admin-dashboard";
import Build from "../components/admin-build";
import Section from "../components/section";
import { EventsList } from "../components/admin-events";
import { isLoggedIn, isAdmin } from "../services/auth";
import { navigate } from "gatsby";
import EventAttendees from "../components/admin-attendees";
import Detail from "../components/attendees-detail";
import SEO from "../components/seo";
import Users from "../components/admin-users";
import EmailForm from "../components/admin-mail";
 
export default function Admin({location}) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isAdmin().then((admin) => {
            if (!(isLoggedIn() && admin)) navigate("/login");
        });
    });

    useEffect(() => {
        isAdmin().then((admin) => {
            if (isLoggedIn() && admin) setLoggedIn(true);
        });
    }, []);

    if (!loggedIn) return null;

    return (
        <Dashboard location={location}>
            <SEO title="Admin"/>
            <Section>
                <Router basepath="/admin">
                    <Build path="/build"/>
                    <EventsList path="/events"/>
                    <EventForm path="/events/add"/>
                    <EventForm path="/events/:eventId"/>
                    <EventAttendees path="/events/attendees"/>
                    <Detail path="/events/attendees/:eventId"/>
                    <Users path="/users"/>
                    <EmailForm path="/users/mail"/>
                </Router>
            </Section>
        </Dashboard>
    );
}