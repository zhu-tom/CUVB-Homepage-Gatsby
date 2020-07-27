import React from "react";
import {Router} from "@reach/router";
import EventForm from "../components/event-form";
import Dashboard from "../components/admin-dashboard";
import Build from "../components/admin-build";
import Section from "../components/section";
import { EventsList } from "../components/admin-events";

export default function Admin({location}) {
    return (
        <Dashboard location={location}>
            <Section>
                <Router basepath="/admin">
                    <Build path="/build"/>
                    <EventsList path="/events"/>
                    <EventForm path="/events/add"/>
                    <EventForm path="/events/:eventId"/>
                </Router>
            </Section>
        </Dashboard>
    );
}