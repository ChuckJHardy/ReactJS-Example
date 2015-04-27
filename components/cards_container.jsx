'use strict';

var React = require('react');

var CardsAction = require('../actions/cards_action');
var CardsStore = require('../stores/cards_store');

var Cards = require('./cards');
var NoCards = require('./no_cards');

function getStateFromStores() {
  return {
    cards: CardsStore.list(),
  };
}

function hasCards(cards) {
  return Object.keys(cards).length > 0;
}

module.exports = React.createClass({
  displayName: 'CardsContainer',

  getInitialState: function() {
    return getStateFromStores();
  },

  componentWillMount: function() {
    CardsAction.list();
    CardsStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function() {
    CardsStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState(getStateFromStores());
  },
  renderContent: function() {
    if (hasCards(this.state.cards)) {
      return <Cards cards={this.state.cards} />;
    } else {
      return <NoCards cards={this.state.cards} />;
    }
  },

  render: function() {
    return this.renderContent();
  }
});
