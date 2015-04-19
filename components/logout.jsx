'use strict';

var React = require('react');

var App = require('./app');

module.exports = React.createClass({
  displayName: 'Logout',

  componentDidMount: function() {
    App.warden.logout();
  },

  render: function() {
    return (
      <div>
        Bye
      </div>
    );
  }
});
