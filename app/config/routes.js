'use strict';

import React from 'react';
import Router from 'react-router';

import App from '../components/app';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';

var Route = Router.Route;

export default (
  <Route handler={App} >
    <Route name='login' path='login' handler={Login} />
    <Route name='register' path='register' handler={Register} />
    <Route name='home' path='/' handler={Home} />
  </Route>    
)
