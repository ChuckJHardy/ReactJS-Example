'use strict';

import React from 'react';
import Router from 'react-router';

import Cards from './cards';

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className='header'>
          <Link to='home' className='header-text'>
            <h1 className='header-logo'>Smart Pickings</h1>
          </Link>
          <div className='header-nav'>
            <Link to='register' className='header-text'>Already have an account?</Link><Link to='login' className='btn'>Login</Link>
          </div>
        </div>
        <div className='hero-container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
}

App.displayName = 'Application';
