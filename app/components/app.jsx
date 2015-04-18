'use strict';

var React = require('react');
var Router = require('react-router');
var Firebase = require('firebase');

var AuthenticationService = require('../services/authentication_service');
var Cards = require('./cards');
var Navigation = require('./navigation');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  displayName: 'Application',

  statics: {
    warden: AuthenticationService,
    firebase: new Firebase(__FIREBASE_URL__)
  },

  render: function() {
    return (
      <div>
        <header className="main-header">
          <Link to='dashboard'>
            <h1 className='main-logo'>Smart Pickings</h1>
          </Link>

          <Navigation />
        </header>
        <div className='hero-container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});
