import React from 'react';
import {  } from 'react-bulma-components';
import 'bulma-calendar/dist/css/bulma-calendar.min.css';
import Editor from 'rich-markdown-editor';
import { debounce } from 'lodash';
import { isBrowser } from '../services/auth';
import { navigate } from 'gatsby';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: "",
            date: "",
            start: "",
            end: "",
            loading: false,
        }
    }

    handleChange({target}) {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleEdit = debounce((val) => {
        const text = val();
        this.setState({markdown: text});
        window.localStorage.setItem("saved", text);
    }, 500);

    handleSubmit() {
        window.localStorage.removeItem("saved");
        const { _id } = JSON.parse(window.localStorage.getItem("currentUser"));
        console.log(`${process.env.GATSBY_API_URL || ""}/api/events/add`);
        fetch(`${process.env.GATSBY_API_URL || ""}/api/events/add`, {
            method: "POST",
            body: JSON.stringify({
                markdown: this.state.markdown,
                date: this.state.date,
                start: this.state.start,
                end: this.state.end,
            }),
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
 
    componentDidUpdate() {

    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="field">
                        <div className="control">
                            <label className="label">Date</label>
                            <input onChange={(e) => this.handleChange(e)} type="date" name="date" className="input"/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control is-expanded">
                            <label className="label">Start</label>
                            <input onChange={(e) => this.handleChange(e)} name="start" type="time" className="input"/>
                        </div>
                        <div className="control is-expanded">
                            <label className="label">End</label>
                            <input onChange={(e) => this.handleChange(e)}  name="end" type="time" className="input"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Markdown</label>

                            <Editor 
                                onChange={this.handleEdit}
                                defaultValue={isBrowser() ? window.localStorage.getItem("saved") || "" : ""}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button onClick={() => this.handleSubmit()} className="button is-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}