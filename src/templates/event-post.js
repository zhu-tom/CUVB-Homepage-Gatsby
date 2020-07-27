import React from 'react';
import Hero from '../components/hero';
import Section from '../components/section';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignUp() {
        
    }

    render() {
        const post = this.props.data.mongodbDatabaseEvents.details;

        return (
            <Layout>
                <Hero titleText="Event" subtitleText="This is an event"/>
                <Section>
                    <div className="content" dangerouslySetInnerHTML={{__html: post ? post.childMarkdownRemark.html : ""}}></div>
                    <button className="button is-primary" onClick={() => this.handleSignUp()}>Sign Up</button>
                </Section>
            </Layout>
        );
    }
}

export const query = graphql`
    query($id: String!) {
        mongodbDatabaseEvents(mongodb_id: {eq: $id}) {
            details {
              childMarkdownRemark {
                html
              }
            }
            title
          }
    }
`;