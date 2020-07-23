import React from 'react';
import Layout from '../components/layout';
import Section from '../components/section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import './styles.scss';
import { isLoggedIn } from '../services/auth';
import { navigate } from 'gatsby';

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPass: false
        }
    }

    toggleShowPass() {
        this.setState((prevState) => ({showPass: !prevState.showPass}));
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit() {
        fetch("/.netlify/functions/login", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
        }).then(res => res.json()).then(res => {
            console.log(res);
        });
    }

    render() {
        if (isLoggedIn()) {
            navigate("/");
        }

        return (
            <Layout>
                <Section>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-half">
                            <Box>
                                <Heading size={3}>Log In</Heading>
                                <Field>
                                    <Label>Email</Label>
                                    <Control iconLeft>
                                        <Input value={this.state.email} onChange={(e) => this.handleChange(e)} name="email" type="email" placeholder="e.g. alexsmith@gmail.com"/>
                                        <Icon align="left">
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Control iconLeft iconRight>
                                        <Input value={this.state.password} onChange={(e) => this.handleChange(e)} name="password" type={this.state.showPass ? "text":"password"} placeholder="e.g. Password"/>
                                        <Icon align="left">
                                            <FontAwesomeIcon icon={faLock}/>
                                        </Icon>
                                        <Icon align="right" className="show-hide" onClick={() => this.toggleShowPass()}>
                                            <FontAwesomeIcon icon={this.state.showPass ? faEyeSlash : faEye}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Field>
                                    <Control>
                                        <Button color="primary">Login</Button>
                                    </Control>
                                </Field>
                            </Box>                    
                        </div>
                    </div>
                </Section>
            </Layout>
        );
    }
}