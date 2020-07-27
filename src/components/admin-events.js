import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import {Link} from "@reach/router";
import { getUser } from '../services/auth';

const Modal = ({active, node, onConfirm, onClose, isLoading}) => {
    return (
        <div className={`modal ${active ? "is-active":""}`}>
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head has-background-danger-dark">
                    <p class="modal-card-title has-text-white">Modal title</p>
                    <button onClick={onClose} class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body has-background-danger-light">
                    <p>Are you sure you want to delete "{node.title}" ({node._id})? <b>This cannot be undone.</b></p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" onClick={onConfirm}>Save changes</button>
                    <button class="button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export function EventsList() {
    const [modalShown, setModalShown] = useState(false);
    const [currNode, setCurrNode] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/events/get?sort=date`, {
            headers: {
                "Authorization": getUser()._id
            }
        }).then(res => res.json()).then(res => {
            if (!res.err) {
                setNodes(res);
            }
        });
    }

    const handleClick = (node) => {
        setCurrNode(node);
        setModalShown(true);
    }

    const handleDelete = (node) => {
        if (node) {
            setIsLoading(true);
            fetch(`${process.env.GATSBY_API_URL || ""}/api/events/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getUser()._id,
                },
                body: JSON.stringify({id: node._id})
            }).then(res => res.json()).then(res => {
                setIsLoading(false);
                if (!res.err) setModalShown(false);
                refresh();
            });
        }
    }

    const handleClose = () => setModalShown(false);

    return (
        <>
        <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Title</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {nodes.map((node, index) => (
                    <tr key={index}>
                        <td>{node._id}</td>
                        <td>{node.date && new Date(node.date.day).toISOString().slice(0,10)}</td>
                        <td>{node.date && node.date.start}</td>
                        <td>{node.date && node.date.end}</td>
                        <td>{node.title}</td>
                        <td><Link to={`/events/${node._id}`} className="button is-link"><span className="icon"><FontAwesomeIcon icon={faEye}/></span></Link></td>
                        <td><Link to={`/admin/events/${node._id}`} className="button is-info"><span className="icon"><FontAwesomeIcon icon={faEdit}/></span></Link></td>
                        <td><button onClick={() => handleClick(node)} className="button is-danger"><span className="icon"><FontAwesomeIcon icon={faTrash}/></span></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Modal
        active={modalShown}
        node={currNode}
        onConfirm={() => handleDelete(currNode)}
        onClose={() => handleClose()}
        isLoading={isLoading}/>
        </>
    );
}