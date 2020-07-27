import React from "react";
import Hero from "../components/hero";
import Tiles from "../components/tiles";
import Section from "../components/section";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import './styles.scss';

export default function Home() {
  return (
    <Layout>
      <Hero titleText="Welcome to the Carleton Volleyball Club" size="fullheight-with-navbar"/>
      <Section hasBgBis>
        <SectionHeader titleText="Upcoming Events" subtitleText="Sign up soon!" isNew={true}/>
        <Tiles limit={4}/>
      </Section>
      <Section>
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
      <Section hasBgBis>
        <SectionHeader titleText="Resources"/>
      </Section>
      <Section>
        <SectionHeader titleText="Links"/>
      </Section>
    </Layout>
  );
}
