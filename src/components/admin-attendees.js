import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../services/auth';
import { Link } from '@reach/router';

export default class EventAttendees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/events/get?sort=true`, {
            headers: {
                "Authorization": getUser()._id,
            },
            method: "GET",
        }).then(res => res.json()).then(res => {
            this.setState({events: res});
        });
    }

    render() {
        return (
            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Attendees</th>
                        <th>Close</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.events.map((node, index) => (
                        <tr key={index}>
                            <td>{node.title}</td>
                            <td>{node.date && new Date(node.date.day).toISOString().slice(0,10)}</td>
                            <td>{node.attendees.length}</td>
                            <td><button className="button is-danger"><span className="icon"><FontAwesomeIcon icon={faLock}/></span></button></td>
                            <td><Link to={`/admin/events/attendees/${node._id}`} className="button is-info"><span className="icon"><FontAwesomeIcon icon={faInfoCircle}/></span></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}