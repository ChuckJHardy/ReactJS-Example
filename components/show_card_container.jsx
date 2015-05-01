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
    CardsStore.addChangeListener(this.onChange);
    CardsAction.find(this.getCardId());
  },
  componentWillUnmount: function() {
    CardsStore.removeChangeListener(this.onChange);
  },

  edit: function() {
    this.context.router.transitionTo(
      'edit_card',
      { cardId: this.getCardId() },
      {}
    );
  },
  getCardId: function() {
    return this.context.router.getCurrentParams().cardId;
  },
  destroy: function() {
    this.context.router.transitionTo(
      'destroy_card',
      { cardId: this.getCardId() },
      {}
    );
  },
  onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return <ShowCard
      card={this.state.card}
      destroy={this.destroy}
      edit={this.edit}
    />;
  }
});
