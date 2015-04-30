'use strict';

var React = require('react');
var Router = require('react-router');

var Authenticated = require('./authenticated');

var RouteHandler = Router.RouteHandler;

module.exports = new Authenticated(React.createClass({
  displayName: 'LoggedIn',

  render: function() {
    return (
      <RouteHandler {...this.props} />
    );
  }
}));
