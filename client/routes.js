import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './containers/App';
import MainApp from './containers/MainApp';
import Login from './components/Login';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MainApp} />
    <Route path="/login" component={Login} />
  </Route>
);

export default Routes;
