import React from 'react';
import { Link, useLocation } from '@reach/router';
import { isLoggedIn, getUser, logout } from '../services/auth';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate } from 'gatsby';

const Logo = ({children}) => {
    return (
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <img
                    src="https://i.ibb.co/XJF3wpq/Untitled-design.png"
                    alt="Logo"
                    style={{maxWidth: '200px', maxHeight:'50px', width: 'auto', height: 'auto'}}/>
            </a>
            {children}
        </div>
    );
}

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navActive: false,
            isClient: false,
        }

        this.handleNav = this.handleNav.bind(this);
    }

    componentDidMount() {
        this.setState({isClient: true});
    }

    handleExpand = () => {
        this.setState((prevState) => ({navActive: !prevState.navActive}));
    }

    handleNav({target}) {
        if (this.props.location === "/" && target.dataset.target) {
            this.props.refs[target.dataset.target].current.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            navigate('/', {state: {scroll: target.dataset.target}});
        }
    }

    render() { 
        const key = this.state.isClient ? "client":"server";       
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <Logo>
                    <a onClick={() => this.handleExpand()} role="button" className={`navbar-burger burger ${this.state.navActive && 'is-active'}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </Logo>
    
                <div id="navbarBasicExample" className={`navbar-menu is-light ${this.state.navActive && 'is-active'}`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
                        </Link>
                        <a onClick={this.handleNav} data-target="events" className="navbar-item">
                            Events
                        </a>
                        <a onClick={this.handleNav} data-target="about" className="navbar-item">
                            About
                        </a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                            More
                            </a>
                            <div className="navbar-dropdown">
                                <a onClick={this.handleNav} data-target="faq" className="navbar-item">
                                    FAQ
                                </a>
                                <a onClick={this.handleNav} data-target="resources" className="navbar-item">
                                    Resources
                                </a>
                                <a onClick={this.handleNav} data-target="resources" className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider"/>
                                <a href="mailto:carletonvolleyballclub@gmail.com" className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>    
                {!this.state.isClient ? null : 
                <div key={key} className="navbar-end">
                    {
                        isLoggedIn() ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    <span className="icon mr-2">
                                        <FontAwesomeIcon icon={faUserAlt}/>
                                    </span>
                                    {getUser().name}
                                </a>
                                <div className="navbar-dropdown is-right">
                                    <Link to="/account" className="navbar-item">
                                        Account
                                    </Link>
                                    <hr className="navbar-divider"/>
                                    <a className="navbar-item" onClick={() => logout(() => navigate("/login"))}>
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
                </div>}
                </div>
            </nav>
        );
    } 
}