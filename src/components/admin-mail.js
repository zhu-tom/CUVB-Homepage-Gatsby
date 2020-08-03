import React from 'react';
import { Field, Control, Input, Label, Textarea } from 'react-bulma-components/lib/components/form';
import { getUser } from '../services/auth';
import {navigate} from '@reach/router';

export default class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipients: [],
            subject: "",
            body: "",
            showRecipients: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMail = this.sendMail.bind(this);
    }

    handleChange({target}) {
        const {name, value} = target;
        this.setState({
            [name]: value
        });
    }

    sendMail() {
        fetch(`${process.env.GATSBY_API_URL || ""}/api/mail`, {
            body: JSON.stringify({
                subject: this.state.subject,
                text: this.state.body,
                to: this.state.recipients,
            }),
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization":getUser()._id
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
        });
    }

    handleDelete(email_address) {
        this.setState(({recipients}) => {
            const index = recipients.findIndex(({email}) => email === email_address);
            recipients.splice(index, 1);
            return ({recipients: recipients});
        });
    }

    componentDidMount() {
        if (!this.props.location.state.recipients) navigate("/admin/users");
        this.setState({recipients: this.props.location.state.recipients});
    }

    render() {
        return (
            <>
                <div className="field is-grouped is-grouped-multiline">
                    {this.state.recipients.map((user, index) => {
                        const {name, email} = user;
                        return (
                            <div key={index} className="control">
                                <div className="tags has-addons">
                                    <span className="tag">{name} {email}</span>
                                    <a onClick={() => this.handleDelete(email)} className="tag is-delete"></a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Field>
                    <Label>Subject</Label>
                    <Control>
                        <Input value={this.state.subject} onChange={this.handleChange} name="subject"/>
                    </Control>
                </Field>
                <Field>
                    <Label>Body</Label>
                    <Control>
                        <Textarea value={this.state.body} name="body" onChange={this.handleChange} style={{whiteSpace: 'pre-wrap'}}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <button onClick={this.sendMail} class="button is-info">Send Email</button>
                    </Control>
                </Field>
            </>
        )
    }
}