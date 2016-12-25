import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser ({ email, password}){
    return function(dispatch) {
        axios.post(`${API_URL}/signin`, { email, password })
            .then(response => {
                //Update state to indicate the user is authenticated
                dispatch({ type: AUTH_USER });
                //Save the JWT token in local storage
                localStorage.setItem('token', response.data.token);
                //redirect to the route /feature
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad Login Information'));
            });
    }
}

export function signUpUser({ email, password}){
    return function(dispatch){
        axios.post(`${API_URL}/signup`, {email, password})
            .then(response => {
                dispatch({ type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(err => {
                dispatch(authError(err.data.error));
            });
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signOutUser(){
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function(dispatch){
        axios.get(API_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}