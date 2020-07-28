import React from 'react';
import Hero from '../components/hero';
import Section from '../components/section';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/layout';
import { getUser, isLoggedIn } from '../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import SEO from '../components/seo';


export default class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modalActive: false,
            signedUp: false,
        }
    }

    handleSignUp() {
        if (!isLoggedIn()) navigate("/login");
        else {
            this.setState({loading: true});
            const {mongodb_id } = this.props.data.mongodbDatabaseEvents;
            fetch(`${process.env.GATSBY_API_URL || ""}/api/events/signup`, {
                method: "POST",
                body: JSON.stringify({
                    user_id: getUser()._id,
                    event_id: mongodb_id,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json()).then(res => {
                if (!res.err) navigate("/");
            }).finally(() => {
                this.setState({loading: false});
            });
        }
    }

    componentDidMount() {
        if (isLoggedIn()) {
            this.setState({loading: true});
            this.checkSignedUp();
        }
    }

    checkSignedUp() {
        const {mongodb_id } = this.props.data.mongodbDatabaseEvents;
        fetch(`${process.env.GATSBY_API_URL || ""}/api/events/checkSignedUp`, {
            method: "POST",
            body: JSON.stringify({
                user_id: getUser()._id,
                event_id: mongodb_id,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(res => {
            this.setState({signedUp: res.err, loading:false});
        });
    }

    handleClose() {
        this.setState({modalActive: false});
    }

    render() {
        const post = this.props.data.mongodbDatabaseEvents.details;
        const node = this.props.data.mongodbDatabaseEvents;
         return (
            <Layout>
                <SEO title={node.title}/>
                <Hero titleText={node.title} subtitleText={node.subtitle}/>
                <Section>
                    <p className={`subtitle mb-1`}><span className="icon mr-2"><FontAwesomeIcon icon={faCalendarAlt}/></span>{node.date && node.date.formattedDate}</p>
                    <p className="subtitle mb-1"><span className="icon mr-2"><FontAwesomeIcon icon={faClock}/></span>{node.date.start} - {node.date.end}</p>
                    <p className="subtitle"><span className="icon mr-2"><FontAwesomeIcon icon={faLocationArrow}/></span>{node.location}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: post ? post.childMarkdownRemark.html : ""}}></div>
                    <button className={`button ${this.state.signedUp ? 'is-warning':'is-primary'} ${this.state.loading ? "is-loading":""}`} onClick={() => this.handleSignUp()}>{this.state.signedUp ? "Cancel":"Sign Up"}</button>
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
            mongodb_id
            subtitle
            location
            date {
                isoDate: day
                formattedDate: day(formatString: "dddd, MMMM Do")
                fromNowDate: day(fromNow: true)
                end
                start
            }
          }
    }
`;