import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'elemental';
require('./LoginJumbotron.scss');

const LoginJumbotron = () => {
    return (
        <Jumbotron>
            <h1>Welcome!</h1>
            <p>Please login to begin</p>
            <Button type="hollow-primary">Login</Button>
        </Jumbotron>
    );
}

export default LoginJumbotron;