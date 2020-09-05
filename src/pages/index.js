import React, { useState, useEffect } from "react";
import Hero from "../components/hero";
import Tiles from "../components/tiles";
import Section from "../components/section";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import './styles.scss';
import SEO from "../components/seo";
import { Accordion } from "../components/accordion";

export default function Home(props) {
  const scroll = props.location.state && props.location.state.scroll;
  return (
    <Layout location={props.location.pathname} scroll={scroll}>
      <SEO title="Home"/>
      <Hero titleText="Welcome to the Carleton Volleyball Club" size="fullheight-with-navbar"/>
      <Section id="events" hasBgBis>
        <SectionHeader titleText="Upcoming Events" subtitleText="Sign up soon!" isNew={true}/>
        <Tiles limit={4}/>
      </Section>
      <Section id="about">
        <SectionHeader titleText="About Us"/>
        <div className="content is-medium">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. 
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. 
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. 
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
        </div>
      </Section>
      <Section id="faq" hasBgBis>
        <SectionHeader titleText="FAQ"/>
        <Accordion>
          <div header="Question 1">
            This is the answer to question 1
          </div>
          <div header="Question 2">
            This is the answer to question 2
          </div>
        </Accordion>
      </Section>
      <Section id="resources">
        <SectionHeader titleText="Resources"/>
        <div className="content is-medium">
          <div className="columns is-desktop">
            <div className="column">
              <h6>Rules</h6>
              <ul>
                <li><a href="http://www.fivb.org/en/refereeing-rules/documents/FIVB-Volleyball_Rules_2017-2020-EN-v06.pdf" target="_blank">Official FIVB Indoor Rules</a></li>
                <li><a href="https://www.fivb.org/EN/Refereeing-Rules/Documents/FIVB-BeachVolleyball_Rules_2017-2020-EN-v05.pdf">Official FIVB Beach Rules</a></li>
                <li><a href="https://cdn3.sportngin.com/attachments/document/282d-2224596/RTP_Document_-_indoor_v2.0.pdf">OVA Return to Play Protocols</a></li>
              </ul>
            </div>
            <div className="column">
              <h6>How to Play</h6>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="columns is-desktop">
            <div className="column">
              <h6>Contact</h6>
              <ul>
                <li></li>
              </ul>
            </div>
            <div className="column">
              <h6>Forms</h6>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
