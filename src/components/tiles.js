import React from 'react';
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
                    nodes = nodes.filter(({node}) => node.date && Date.parse(node.date.isoDate) > Date.now());
                    if (limit) nodes = nodes.slice(0, limit);
                    return nodes.map(({ node }, index) => {
                        return (
                            <div key={index} className="tile is-parent">
                                <div style={{justifyContent: "space-between", display: "flex", flexDirection:"column"}} className="tile is-child box">
                                    <div>
                                        <p className={`title ${node.subtitle ? "":"is-spaced"}`}>{node.title}</p>
                                        <p className="subtitle">{node.subtitle}</p>
                                        <p className={`subtitle mb-1`}><span className="icon mr-2"><FontAwesomeIcon icon={faCalendarAlt}/></span>{node.date && node.date.formattedDate}</p>
                                        <p className="subtitle mb-1"><span className="icon mr-2"><FontAwesomeIcon icon={faClock}/></span>{node.date.start} - {node.date.end}</p>
                                        <p className="subtitle mb-1"><span className="icon mr-2"><FontAwesomeIcon icon={faLocationArrow}/></span>{node.location}</p>
                                    </div>
                                    <div>
                                        <Link to={`/events/${node.mongodb_id}`} className="is-link is-pulled-right button">More</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                }}/>
        </div>
    );
}