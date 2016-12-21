import React, { Component } from 'react';
import Header from './header/header';
import { Button } from 'elemental';
require('./elemental-less/style.less');

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}

        <Button type="primary">Primary</Button>
      </div>
    );
  }
}