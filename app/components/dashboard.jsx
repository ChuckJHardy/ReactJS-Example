'use strict';

var React = require('react');

var Authenticated = require('./authenticated');

module.exports = Authenticated(React.createClass({
  displayName: 'Dashboard',

  render: function() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}));
