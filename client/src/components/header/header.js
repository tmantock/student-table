import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
require('./Header.scss');

class Header extends Component {
    renderLinks(){
        
        if(this.props.authenticated){

            return [
                    <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign-In</Link>
                    </li>,
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign-Up</Link>
                    </li>
            ];
        } else {
            return [
                <li className="nav-item">
                    <Link className="nav-link" to="/grades">Grades</Link>
                </li>,
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign-Out</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect id="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to="/">
                        Student Manager
                    </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.renderLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(Header);