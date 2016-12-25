import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import reducers from './reducers';

require('./theme/_config.less');

import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, consider the user to be signed in
if(token){
  //we need to update teh application state
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.react-container'));