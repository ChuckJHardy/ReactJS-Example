'use strict';

var React = require('react');
var Router = require('react-router');
var Firebase = require('firebase');

var Alert = require('./alert');
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

    setTimeout(function() {
      this.setAlert(null);
    }.bind(this), 3000)
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
