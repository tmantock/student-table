import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import LoginJumbotron from './components/login-jumbotron/LoginJumbotron';
import reducers from './reducers';

require('./theme/_config.less');

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LoginJumbotron} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#react-element'));