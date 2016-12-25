import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Form, FormField, FormInput, Button } from 'elemental';
require('./Signin.scss');

class SignUp extends Component {
    handleFormSubmit(formProps){
        //Call action creator to sign up the user
        this.props.signUpUser(formProps);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong> Oops! {this.props.errorMessage}</strong>
                </div>
            );
        }
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, fields: { email, password, passwordConfirm } } = this.props;

        return (
            <div className="auth-form">
                <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <FormField htmlFor="input-email">
                        <FormInput {...email} name="input-email" />
                        { email.touched && email.error && <div className="error"> {email.error} </div>}
                    </FormField>
                    <FormField htmlFor="input-password">
                        <FormInput {...password} name="input-password" type="password" />
                        { password.touched && password.error && <div className="error">{password.error}</div> }
                    </FormField>
                    <FormField htmlFor="input-passwordConfirm">
                        <FormInput {...passwordConfirm} name="input-password" type="password" />
                        { passwordConfirm.touched && passwordConfirm.error && <div className="error"> {passwordConfirm.error} </div> }
                    </FormField>
                    {this.renderAlert()}
                    <Button type="hollow-primary" disabled={ pristine || submitting || email.error || password.error || passwordConfirm.error } >Sign Up</Button>
                </Form>
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {};

    const messages = {
        email: 'Please enater an email',
        password: 'Please enter a password',
        passwordConfirm: 'Please enter a password confirmation'
    }

    for(var prop in formProps){
        if(!formProps[prop]){
            errors[prop] = messages[prop];
        }
    }
    
    if(formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(SignUp);