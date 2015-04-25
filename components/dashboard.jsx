'use strict';

var React = require('react');
var Router = require('react-router');

var Cards = require('./cards');

var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'Dashboard',

  render: function() {
    return (<Cards />);
  }
});
