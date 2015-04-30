'use strict';

var React = require('react');
var Router = require('react-router');

var Account = require('../components/account');
var App = require('../components/app');
var Bye = require('../components/bye');
var Logout = require('../components/logout');
var Dashboard = require('../components/dashboard');
var Deregister = require('../components/deregister');
var LoggedIn = require('../components/logged_in');
var Login = require('../components/login');
var Logout = require('../components/logout');
var NewCard = require('../components/new_card');
var Register = require('../components/register');
var PasswordReset = require('../components/password_reset');
var Subscribe = require('../components/subscribe');
var ShowCard = require('../components/show_card');

var Route = Router.Route;

module.exports = (
  <Route handler={App} >
    <Route handler={LoggedIn} >
      <Route name='dashboard' path='/' handler={Dashboard} />
      <Route name='new_card' path='/cards/new' handler={NewCard} />
      <Route name='show_card' path='/cards/:cardId' handler={ShowCard} />
      <Route name='account' handler={Account} />
      <Route name='deregister' handler={Deregister} />
    </Route>

    <Route name='login' path='login' handler={Login} />
    <Route name='logout' path='logout' handler={Logout} />
    <Route name='bye' path='bye' handler={Bye} />
    <Route name='register' path='register' handler={Register} />
    <Route name='password_reset' path='password_reset' handler={PasswordReset} />
    <Route name='subscribe' path='subscribe' handler={Subscribe} />
  </Route>
);
