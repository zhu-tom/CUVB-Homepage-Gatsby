import React from 'react';
import Layout from '../components/layout';
import Section from '../components/section';
import { faEye, faEnvelope, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input';
import FormField from '../components/form-field';
import FormIcon from '../components/form-icon';
import { handleLogin, isLoggedIn, isAdmin } from '../services/auth';
import { navigate } from 'gatsby';
import SEO from '../components/seo';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            isNameValid: true,
            isEmailValid: true,
            isPasswordValid: true,
            showPass: false,
            loading: false
        }
    }

    toggleShowPass() {
        this.setState((prevState) => ({showPass: !prevState.showPass}));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        this.setState((state) => ({
            isNameValid: state.name,
            isPasswordValid: state.password.length >= 6,
            isEmailValid: emailRegex.test(state.email)
        }), () => {
            if (this.state.isEmailValid && this.state.isNameValid && this.state.isPasswordValid) {
                this.setState({loading: true});
                fetch(`${process.env.GATSBY_API_URL || ""}/api/signup`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                    }),
                    method: "POST",
                })
                .then(res => res.json()).then(res => {
                    console.log(res);
                    handleLogin(res);
                    this.setState({loading:false});
                }).catch((reason) => {
                    console.log(reason);
                });
            }
        });  
    }

    componentDidUpdate() {
        this.checkLoggedIn();
    }

    componentWillMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn() {
        if (isLoggedIn()) {
            if (isAdmin()) navigate("/admin");
            else navigate("/");
        }
    }

    render() {
        return (
            <Layout>
                <SEO title="Sign Up"/>
                <Section>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-half">
                            <div className="box">
                                <h3 className="title is-3">Sign Up</h3>
                                <FormField label="Name">
                                    <Input 
                                        type="text" name="name" 
                                        disabled={this.state.loading}
                                        value={this.state.name}
                                        placeholder="e.g Alex Smith" 
                                        leftIcon={<FormIcon isLeft icon={faUser}/>} 
                                        isValid={this.state.isNameValid} 
                                        invalidMessage="This field is required"
                                        onChange={(e) => this.handleChange(e)}/>
                                </FormField>
                                <FormField label="Email">
                                    <Input 
                                        type="text" name="email" 
                                        value={this.state.email}
                                        disabled={this.state.loading}
                                        placeholder="e.g. alexsmith@gmail.com" 
                                        leftIcon={<FormIcon isLeft icon={faEnvelope}/>} 
                                        isValid={this.state.isEmailValid} 
                                        invalidMessage="Invalid email"
                                        onChange={(e) => this.handleChange(e)}/>
                                </FormField>
                                <FormField label="Password">
                                    <Input 
                                        type={this.state.showPass ? "text":"password"}
                                        disabled={this.state.loading}
                                        name="password" value={this.state.password}
                                        placeholder="e.g. Password" 
                                        leftIcon={<FormIcon isLeft icon={faLock}/>} 
                                        rightIcon={<FormIcon className="show-hide" isRight onClick={() => this.toggleShowPass()} icon={this.state.showPass ? faEyeSlash : faEye}/>}
                                        isValid={this.state.isPasswordValid} 
                                        invalidMessage="Must be at least 6 characters long"
                                        onChange={(e) => this.handleChange(e)}/>
                                </FormField>
                                <FormField>
                                    <button onClick={() => this.handleSubmit()} className={`button is-primary ${this.state.loading && "is-loading"}`}>Sign Up</button>
                                </FormField>
                            </div>                    
                        </div>
                    </div>
                </Section>
            </Layout>
        );
    }
}