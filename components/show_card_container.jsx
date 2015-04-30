'use strict';

var React = require('react');
var Router = require('react-router');

var CardsAction = require('../actions/cards_action');
var CardsStore = require('../stores/cards_store');

var ShowCard = require('./show_card');

function getStateFromStores() {
  return {
    card: CardsStore.card(),
  };
}

module.exports = React.createClass({
  displayName: 'ShowCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentWillMount: function() {
    CardsAction.find(this.context.router.getCurrentParams().cardId);
    CardsStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function() {
    CardsStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return <ShowCard card={this.state.card} />;
  }
});
