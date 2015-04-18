'use strict';

var React = require('react');

var App = require('./app');

module.exports = function(WrappedComponent) {
  return React.createClass({
    displayName: 'Authenticated',

    statics: {
      willTransitionTo: function(transition) {
        if (false) {
          transition.redirect('/login', {}, {'nextPath' : transition.path});
        }
      }
    },

    render: function() {
      return (<WrappedComponent {...this.props} />)
    }
  });
};
