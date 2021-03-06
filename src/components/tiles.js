import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {Link} from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { getUser, isLoggedIn } from '../services/auth';

export default function Tiles({ limit }) {
    return (
        <div className="tile is-ancestor">
            <StaticQuery
                query={graphql`
                    query {
                        allMongodbDatabaseEvents(sort: {fields: date___day}) {
                            edges {
                                node {
                                    date {
                                        isoDate: day
                                        formattedDate: day(formatString: "dddd, MMMM Do")
                                        fromNowDate: day(fromNow: true)
                                        end
                                        start
                                    }
                                    title
                                    location
                                    mongodb_id
                                    subtitle
                                }
                            }
                        }
                    }
                `}
                render={(data) => {
                    let nodes = data.allMongodbDatabaseEvents.edges;
                    nodes = nodes.filter(({node}) => node.date && (Date.parse(node.date.isoDate) + (parseInt(node.date.end.slice(0, 2)) * 60 * 60 * 1000))> Date.now());
                    if (limit) nodes = nodes.slice(0, limit);
                    return nodes.map(({ node }, index) => {
                        return (
                            <EventTile key={index} node={node}/>
                        );
                    });
                }}/>
        </div>
    );
}

export function EventTile({ node }) {
    return (
        <div className="tile is-parent is-3">
            <div style={{justifyContent: "space-between", display: "flex", flexDirection:"column"}} className="tile is-child box">
                <div>
                    <p className={`title ${node.subtitle ? "":"is-spaced"}`}>{node.title}</p>
                    <p className="subtitle">{node.subtitle}</p>
                    <p className={`subtitle mb-1`}><span className="icon mr-2"><FontAwesomeIcon icon={faCalendarAlt}/></span>{node.date && (node.date.formattedDate || new Date(node.date.day).toISOString().slice(0,10))}</p>
                    <p className="subtitle mb-1"><span className="icon mr-2"><FontAwesomeIcon icon={faClock}/></span>{node.date.start} - {node.date.end}</p>
                    <p className="subtitle mb-1"><span className="icon mr-2"><FontAwesomeIcon icon={faLocationArrow}/></span>{node.location}</p>
                </div>
                <div>
                    <VisitButton event_id={node.mongodb_id || node._id}/>
                </div>
            </div>
        </div>
    );
}

function VisitButton({event_id}) {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.GATSBY_API_URL||""}/api/events/checkSignedUp`, {
            method: "POST",
            body: JSON.stringify({
                event_id: event_id,
                user_id: getUser()._id,
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res => res.json()).then(res => {
            setIsSignedUp(res.err);
            setIsLoading(false);
        });
    }, []);

    return (
        <Link to={`/events/${event_id}`} className={`${isSignedUp ? 'is-warning':'is-primary'} ${isLoading ? 'is-loading':''} is-pulled-right button`}>{isSignedUp ? 'Cancel':'Sign Up'}</Link>
    );
}