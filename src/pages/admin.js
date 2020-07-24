import React from "react";
import {Router} from "@reach/router";
import EventForm from "../components/event-form";

export default function Admin() {
    return (
        <Router basepath="/admin">
            <EventForm path="/add-event"/>
        </Router>
    );
}