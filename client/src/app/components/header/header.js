import React, { Component } from 'react';
import { Link } from 'react-router';
require('./header.scss');

class Header extends Component {
    render(){
        return (
            <nav className = "navbar navbar-light" id="navbar">
                <div className = "container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#react-redux-nav-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">React Redux</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="react-redux-nav-collapse">
                        <ul className = "nav navbar-nav navbar-right">
                            <li className = "nav-item" key={1}>
                                <Link className="nav-link" to="/signin">Sign-In</Link>
                            </li>
                            <li className="nav-item" key={2}>
                                <Link className="nav-link" to="/signup">Sign-Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;