import Section from "../components/section";
import SectionHeader from "../components/section-header";
import Tabs, {Tab} from './tabs';
import {} from 'react-bulma-components/lib/components/form';

import React, { useState } from 'react';

export default function Details() {
    return (
        <Section>
            <SectionHeader titleText="My Account"/>
            <Tabs>
                <Tab header="Details">
                    Details
                </Tab>
                <Tab header="Events">
                    Events
                </Tab>
            </Tabs>
        </Section>
    );
}