import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';
require('./header.scss');

class Header extends Component {
    render(){
        return (
            <AppBar title='React Toolbox' leftIcon='menu'>
                <Navigation type='horizontal'>
                    
                </Navigation>
            </AppBar>
        );
    }
}

export default Header;