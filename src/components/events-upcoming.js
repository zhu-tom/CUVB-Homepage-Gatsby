import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {Link} from '@reach/router';

export default function Upcoming() {
    <StaticQuery
                query={graphql`
                    query {
                        allMongodbDatabaseEvents(sort: {fields: date___day}) {
                            edges {
                                node {
                                    date {
                                        day(formatString: "MMMM Do, YYYY")
                                        end
                                        start
                                    }
                                    title
                                    mongodb_id
                                }
                            }
                        }
                    }
                `}
                render={(data) => {
                    const nodes = data.allMongodbDatabaseEvents.edges;
                    return nodes.map(({ node }, index) => {
                        return (
                            <tr key={index}>
                                <td>{node.mongodb_id}</td>
                                <td>{node.date && node.date.day}</td>
                                <td>{node.date && node.date.start}</td>
                                <td>{node.date && node.date.end}</td>
                                <td>{node.title}</td>
                                <td><Link to={`/events/${node.mongodb_id}`} className="button is-link"><span className="icon"><FontAwesomeIcon icon={faEye}/></span></Link></td>
                                <td><Link to={`/admin/events/${node.mongodb_id}`} className="button is-info"><span className="icon"><FontAwesomeIcon icon={faEdit}/></span></Link></td>
                                <td><button onClick={() => handleClick(node)} className="button is-danger"><span className="icon"><FontAwesomeIcon icon={faTrash}/></span></button></td>
                            </tr>
                        )
                    });
                }}/>
}