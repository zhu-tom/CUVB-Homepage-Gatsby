import React from "react";
import {Router} from "@reach/router";
import EventForm from "../components/event-form";
import Dashboard from "../components/admin-dashboard";

export default function Admin({location}) {
    return (
        <Dashboard location={location}>
            <Router basepath="/admin">

                <EventForm path="/add-event"/>
            </Router>
        </Dashboard>
    );
}