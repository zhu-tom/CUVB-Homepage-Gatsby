import React from 'react';
import { Link } from '@reach/router';
import { isLoggedIn, getUser, logout } from '../services/auth';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate } from 'gatsby';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navActive: false,
            loggedIn: isLoggedIn(),
        }
    }

    handleExpand = () => {
        this.setState((prevState) => ({navActive: !prevState.navActive}));
    }

    componentWillUpdate() {
        this.setState({loggedIn: isLoggedIn()});
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo"/>
                    </a>
    
                    <a onClick={() => this.handleExpand()} role="button" className={`navbar-burger burger ${this.state.navActive && 'is-active'}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
    
                <div id="navbarBasicExample" className={`navbar-menu is-light ${this.state.navActive && 'is-active'}`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
                        </Link>
    
                        <a className="navbar-item">
                            Documentation
                        </a>
    
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                            More
                            </a>
    
                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider"/>
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="navbar-end">
                    {
                        this.state.loggedIn ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    <span className="icon mr-2">
                                        <FontAwesomeIcon icon={faUserAlt}/>
                                    </span>
                                    {getUser().name}
                                </a>
                                <div class="navbar-dropdown is-right">
                                    <a class="navbar-item">
                                        Overview
                                    </a>
                                    <a class="navbar-item">
                                        Elements
                                    </a>
                                    <a class="navbar-item">
                                        Components
                                    </a>
                                    <hr class="navbar-divider"/>
                                    <a class="navbar-item" onClick={() => logout(() => navigate("/login"))}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link to="/signup/" className="button is-primary">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link to="/login/" className="button is-light">
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        )
                        
                    }
                </div>
            </nav>
        );
    } 
}