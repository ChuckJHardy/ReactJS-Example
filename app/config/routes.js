'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('../components/app');
var Home = require('../components/home');
var Login = require('../components/login');
var Register = require('../components/register');

var Route = Router.Route;

module.exports = (
  <Route handler={App} >
    <Route name='login' path='login' handler={Login} />
    <Route name='register' path='register' handler={Register} />
    <Route name='home' path='/' handler={Home} />
  </Route>    
);
