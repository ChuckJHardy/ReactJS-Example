'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('../components/app');
var Dashboard = require('../components/dashboard');
var Home = require('../components/home');
var Login = require('../components/login');
var Logout = require('../components/logout');
var Register = require('../components/register');

var Route = Router.Route;

module.exports = (
  <Route handler={App} >
    <Route name='login' path='login' handler={Login} />
    <Route name='logout' path='logout' handler={Logout} />
    <Route name='register' path='register' handler={Register} />
    <Route name='dashboard' handler={Dashboard} />
    <Route name='home' path='/' handler={Home} />
  </Route>    
);
