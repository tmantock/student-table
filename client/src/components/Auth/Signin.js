import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Form, FormField, FormInput, Button } from 'elemental';

class Signin extends Component {
    handleFormSubmit({email, password}){
        this.props.signinUser({ email, password });
    }

    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className = "alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render(){
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <FormField label="Email" htmlFor="input-email">
                    <FormInput {...email} type="email" placeholder="Email" name="input-email" />
                </FormField>
                <FormField label="Password" htmlFor="input-password">
                    <FormInput {...password} type = "password" placeholder="Password" name="input-password" />
                </FormField>
                {this.renderAlert()}
                <Button submit>Sign-In</Button>
            </Form>
        );
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);