import React from 'react';
import {  } from 'react-bulma-components';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: "---\ntitle: INSERT TITLE HERE\nlocation: INSERT LOCATION HERE\n---\n",
        }
    }

    handleChange({target}) {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="field">
                        <label className="label">Markdown</label>
                        <div className="control">
                            <textarea className="textarea has-fixed-size" name="markdown" style={{whiteSpace: "pre-wrap"}} placeholder="Textarea" value={this.state.markdown} rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}