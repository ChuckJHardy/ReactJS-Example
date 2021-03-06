'use strict';

var React = require('react');
var Router = require('react-router');

var Account = require('../components/account');
var App = require('../components/app');
var Bye = require('../components/bye');
var Dashboard = require('../components/dashboard');
var Deregister = require('../components/deregister');
var DestroyCardContainer = require('../components/destroy_card_container');
var EditCardContainer = require('../components/edit_card_container');
var Logout = require('../components/logout');
var LoggedIn = require('../components/logged_in');
var Login = require('../components/login');
var Logout = require('../components/logout');
var NewCardContainer = require('../components/new_card_container');
var Register = require('../components/register');
var PasswordReset = require('../components/password_reset');
var Subscribe = require('../components/subscribe');
var ShowCardContainer = require('../components/show_card_container');

var Route = Router.Route;

module.exports = (
  <Route handler={App} >
    <Route handler={LoggedIn} >
      <Route name='dashboard' path='/' handler={Dashboard} />
      <Route name='new_card' path='/cards/new' handler={NewCardContainer} />
      <Route name='show_card' path='/cards/:cardId' handler={ShowCardContainer} />
      <Route name='edit_card' path='/cards/:cardId/edit' handler={EditCardContainer} />
      <Route name='destroy_card' path='/cards/:cardId/destroy' handler={DestroyCardContainer} />
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
