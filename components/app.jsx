'use strict';

var React = require('react');
var Router = require('react-router');
var Firebase = require('firebase');
var Airbrake = require('airbrake-js');

var Alert = require('./alert');
var AuthenticationService = require('../services/authentication_service');
var Cards = require('./cards');
var Navigation = require('./navigation');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  displayName: 'Application',

  statics: {
    airbreak: new Airbrake({
      projectId: __AIRBREAK_PRODUCT_ID__,
      projectKey: __AIRBREAK_PRODUCT_KEY__
    }),
    warden: AuthenticationService,
    firebase: new Firebase(__FIREBASE_URL__)
  },

  getInitialState: function() {
    return {
      alerts: {
        danger: null
      }
    };
  },

  setAlert: function(danger) {
    this.setState({
      alerts: {
        danger: danger
      }
    });
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

        <Alert message={this.state.alerts.danger} />

        <div className='hero-container'>
          <RouteHandler setAlert={this.setAlert} />
        </div>
      </div>
    );
  }
});
