'use strict';

var React = require('react');
var Router = require('react-router');

var CardsContainer = require('./cards_container');

var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'Dashboard',

  render: function() {
    return (<CardsContainer />);
  }
});
