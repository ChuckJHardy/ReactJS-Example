'use strict';

var React = require('react');
var Router = require('react-router');

var Account = require('../components/account');
var App = require('../components/app');
var Dashboard = require('../components/dashboard');
var Deregister = require('../components/deregister');
var LoggedIn = require('../components/logged_in');
var Login = require('../components/login');
var Logout = require('../components/logout');
var Register = require('../components/register');
var PasswordReset = require('../components/password_reset');
var Subscribe = require('../components/subscribe');

var Route = Router.Route;

module.exports = (
  <Route handler={App} >
    <Route name='subscribe' path='/' handler={Subscribe} />
    <Route name='login' path='login' handler={Login} />
    <Route name='logout' path='logout' handler={Logout} />
    <Route name='register' path='register' handler={Register} />
    <Route name='password_reset' path='password_reset' handler={PasswordReset} />

    <Route handler={LoggedIn} >
      <Route name='dashboard' handler={Dashboard} />
      <Route name='account' handler={Account} >
        <Route name='deregister' handler={Deregister} />
      </Route>
    </Route>
  </Route>
);
