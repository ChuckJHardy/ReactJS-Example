'use strict';

var React = require('react');
var Router = require('react-router');
var Firebase = require('firebase');

var Cards = require('./cards');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  displayName: 'Application',

  statics: {
    firebase: new Firebase(__FIREBASE_URL__)
  },

  render: function() {
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
});
