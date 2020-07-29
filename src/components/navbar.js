import React from 'react';
import { Link } from '@reach/router';
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
    }

    handleExpand = () => {
        this.setState((prevState) => ({navActive: !prevState.navActive}));
    }

    componentDidMount() {
        this.setState({isClient: true});
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
                                <div class="navbar-dropdown is-right">
                                    <Link to="/account" className="navbar-item">
                                        Account
                                    </Link>
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
                </div>}
                </div>
            </nav>
        );
    } 
}