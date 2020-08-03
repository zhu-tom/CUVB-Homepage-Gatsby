import React from 'react';
import Table from './table';
import { getUser } from '../services/auth';
import { Field, Control, Input, Label } from 'react-bulma-components/lib/components/form';
import * as _ from "underscore";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, navigate} from '@reach/router';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            users: [],
            selected: {},
        }
        this.handleThrottleInput = _.throttle(this.throttleInput, 300);
        this.handleSelectAll = this.handleSelectAll.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/users/query`, {
            headers: {
                "Authorization":getUser()._id,
            },
            method: "GET"
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (!res.err) this.setState({users: res.users});
        });
    }

    handleSelect(id) {
        this.setState((state) => {
            return ({
                selected: {
                    ...state.selected,
                    [id]: !state.selected[id]
                }
            });
        });
    }

    throttleInput() {
        console.log(this.state.query);
        fetch(`${process.env.GATSBY_API_URL || ""}/api/users/query?q=${encodeURIComponent(this.state.query)}`, {
            headers: {
                "Authorization":getUser()._id,
            },
            method: "GET"
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (!res.err) this.setState({users: res.users});
        });
    }

    onSearch({target}) {
        const {value, name} = target;
        this.setState({
            [name]: value
        }, () => {
            this.handleThrottleInput();
        });
    }

    handleSelectAll() {
        const allSelected = this.isAllSelected();
        this.setState(({users, selected}) => {
            users.forEach(user => {
                selected[user._id] = !allSelected;
            });
            return {selected: selected};
        });
    }

    handleMassEmail(recipients) {
        navigate("/admin/users/mail", {
            state: {
                recipients: recipients
            }
        });
    }

    isAllSelected = () => Object.getOwnPropertyNames(this.state.selected).length !== 0 && Object.values(this.state.selected).every(val => val);

    render() {
        const allSelected = this.isAllSelected();
        const selectedUsers = this.state.users.filter(({_id}) => this.state.selected[_id]);
        return (
            <>
                <Field>                        
                    <Label>Search</Label>
                    <Control>
                        <Input type="text" onChange={(event) => this.onSearch(event)} value={this.state.query} name="query"/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <div className="buttons">
                            <button onClick={this.handleSelectAll} className={`button ${allSelected ? 'is-danger':'is-success'}`}>{`${allSelected ? 'Unselect All':'Select All'}`}</button>
                            <button onClick={() => this.handleMassEmail(selectedUsers)} disabled={!Object.values(this.state.selected).some((val) => val)} className="button is-info"><span className="icon"><FontAwesomeIcon icon={faEnvelope}/></span></button>
                        </div>
                    </Control>
                </Field>
                <Table headers={['Select', 'ID', 'Name', 'Email', 'Created']}>
                    {this.state.users.map((user, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" onChange={() => this.handleSelect(user._id)} checked={this.state.selected[user._id]}/></td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><Link to="/admin/users/email" state={{recipients: [user]}}>{user.email}</Link></td>
                            <td>{user.created && new Date(user.created).toLocaleString()}</td>
                        </tr>
                    ))}
                </Table>
            </>
        );
    }
}