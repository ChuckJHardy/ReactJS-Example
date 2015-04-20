'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Alert',

  propTypes: {
    message: React.PropTypes.string,
  },

  classNames: function() {
    return this.props.message ? 'alert alert-danger' : 'alert-null';
  },

  render: function() {
    return (
      <div className={this.classNames()}>{this.props.message}</div>
    );
  }
});
