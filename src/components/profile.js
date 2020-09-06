import Section from "../components/section";
import SectionHeader from "../components/section-header";
import Tabs, {Tab} from './tabs';
import { Field, Label, Control, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { getUser } from "../services/auth";

import {StaticQuery, graphql} from 'gatsby';
import { EventTile } from "./tiles";

export default function Details() {
    const [data, setData] = useState({});

    useEffect(() => { 
        fetch(`${process.env.GATBSY_API_URL || ""}/api/users/query?id=${getUser()._id}`, {
            method: "GET",
            headers: {
                "Authorization": getUser()._id,
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            setData(res.user);
        });
    }, []);

    return (
        <Section>
            <SectionHeader titleText="My Account"/>
            <Tabs>
                <Tab header="Details">
                    <HorizontalField label="Name">
                        <Input value={data.name} disabled={true}/>
                    </HorizontalField>
                    <HorizontalField label="Email">
                        <Input value={data.email} disabled={true}/>
                    </HorizontalField>
                    <HorizontalField label="Password">
                        <Button color="primary">Reset Password</Button>
                    </HorizontalField>
                </Tab>
                <Tab header="Events">
                    <div className="tile is-ancestor">
                        {data.events && data.events.map((event, index) => {
                            return (
                                <EventTile key={index} node={event}/>
                            );
                        })}
                    </div>                    
                </Tab>
            </Tabs>
        </Section>
    );
}

function HorizontalField({label, children}) {
    return (
        <Field horizontal={true}>
            <div className="field-label is-normal">
                <Label>{label}</Label>
            </div>
            <div className="field-body">
                <Field>
                    <Control>
                        {children}
                    </Control>
                </Field>
            </div>
        </Field>
    );
}

HorizontalField.propTypes = {
    children: PropTypes.element
}