import React, { useState, useEffect } from 'react';
import Table from './table';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Detail({ eventId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/users/get`, {
            method: "POST",
            body: JSON.stringify({event_id: eventId}),
            headers: {
                "Content-Type":"application/json",
            }
        }).then(res => res.json()).then(res => {
            setData(res);
        });
    }

    const handleClick = (id) => {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/events/attendees/delete`, {
            method: "POST",
            body: JSON.stringify({
                event_id: eventId,
                user_id: id
            }),
            headers: {
                "Content-Type":"application/json"
            },
        }).then(res => res.json()).then(res => {
            if (!res.err) refresh();
        });
    }


    return (
        <Table headers={['#', 'ID', 'Name', 'Email', "Remove"]}>
            {data.map((user, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><button onClick={() => handleClick(user._id)} className="button is-danger"><span className="icon"><FontAwesomeIcon icon={faTrashAlt}/></span></button></td>
                </tr>
            ))}
        </Table>
    );
}