'use strict';

var React = require('react');

var App = require('./app');

module.exports = React.createClass({
  displayName: 'Bye',

  render: function() {
    return (
      <div>
        Sad to see you leave.
      </div>
    );
  }
});
