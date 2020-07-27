import React from 'react';
import {  } from 'react-bulma-components';
import 'bulma-calendar/dist/css/bulma-calendar.min.css';
import Editor from 'rich-markdown-editor';
import { debounce } from 'lodash';
import { isBrowser, getUser } from '../services/auth';
import { navigate } from 'gatsby';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: props.markdown || "",
            date: props.date || "",
            start:  props.start || "",
            end: props.end || "",
            title: "",
            location: "",
            subtitle: "",
            loading: false,
        }

    }

    handleChange({target}) {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleEdit = debounce((val) => {
            const value = val()
            this.setState({markdown: value})
            window.localStorage.setItem("saved", value);
        }, 500);

    componentDidMount() {
        if (this.props.eventId) {
            fetch(`${process.env.GATSBY_API_URL || ""}/api/events/get?id=${this.props.eventId}`, {
                headers: {
                    "Authorization": getUser()._id
                }
            }).then(res => res.json()).then(res => {
                this.setState({
                    markdown: res.details,
                    date: new Date(res.date.day).toLocaleDateString(),
                    start: res.date.start,
                    end: res.date.end,
                    title: res.title,
                    location: res.location,
                    subtitle: res.subtitle
                });
            });
        }
    }

    handleSubmit() {
        let body = {
            markdown: this.state.markdown,
            date: this.state.date,
            start: this.state.start,
            end: this.state.end,
            title: this.state.title,
            location: this.state.location,
            subtitle: this.state.subtitle,
        }

        let url = "";

        if (this.props.eventId) {
            url = `${process.env.GATSBY_API_URL || ""}/api/events/edit`;
            body.id = this.props.eventId;
        } else {
            url = `${process.env.GATSBY_API_URL || ""}/api/events/add`;
        }

        window.localStorage.removeItem("saved");
        const { _id } = JSON.parse(window.localStorage.getItem("currentUser"));
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": _id,
            },
        }).then(res => res.json()).then((res) => {
            if (!res.err) {
                navigate("/admin");
            }
        });
    }


    render() {
        return (
            <>
                <div className="field">
                    <div className="control">
                        <label className="label">Title</label>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.title} type="text" name="title" className="input"/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Subtitle</label>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.subtitle} type="text" name="subtitle" className="input"/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Location</label>
                        <input onChange={(e) => this.handleChange(e)} value={this.state.location} type="text" name="location" className="input"/>
                    </div>
                </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Date</label>
                            <input onChange={(e) => this.handleChange(e)} value={this.state.date} type="date" name="date" className="input"/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control is-expanded">
                            <label className="label">Start</label>
                            <input onChange={(e) => this.handleChange(e)} value={this.state.start} name="start" type="time" className="input"/>
                        </div>
                        <div className="control is-expanded">
                            <label className="label">End</label>
                            <input onChange={(e) => this.handleChange(e)} value={this.state.end} name="end" type="time" className="input"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Markdown</label>
                            <Editor
                                onChange={this.handleEdit}
                                value={this.state.markdown}
                                defaultValue={isBrowser() && window.localStorage.getItem("saved") || ""}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button onClick={() => this.handleSubmit()} className={`button is-primary ${this.state.loading ? "is-loading":""}`}>Submit</button>
                        </div>
                    </div>
                </>
        );
    }
}