'use strict';

var React = require('react');

var App = require('../components/app');
var CardForm = require('../components/card_form');
var CardsAction = require('../actions/cards_action');
var CardsStore = require('../stores/cards_store');
var FirebaseService = require('../services/firebase_service');

function getStateFromStores() {
  return {
    card: CardsStore.card(),
  };
}

function populateField(ref, state, value) {
  ref[value].getDOMNode().value = state[value];
}

module.exports = React.createClass({
  displayName: 'EditCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setAlert: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentWillMount: function() {
    CardsAction.find(this.getCardId());
    CardsStore.addChangeListener(this.onChange);
  },
  componentDidMount: function() {
    this.setDefaultValues();
  },
  componentWillUnmount: function() {
    CardsStore.removeChangeListener(this.onChange);
  },

  getCardId: function() {
    return this.context.router.getCurrentParams().cardId;
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function() {
    this.context.router.replaceWith('show_card', { cardId: this.getCardId() }, {});
  },
  onChange: function() {
    this.setState(getStateFromStores());
  },
  update: function(data) {
    FirebaseService.cards.update(
      App.firebase(),
      this.getCardId(),
      data,
      this.handlerError,
      this.handlerSuccess
    );
  },
  setDefaultValues: function() {
    var formRefs = this.refs.form.refs;

    populateField(formRefs, this.state.card, 'location');
    populateField(formRefs, this.state.card, 'price');
    populateField(formRefs, this.state.card, 'description');
    populateField(formRefs, this.state.card, 'bedrooms');
    populateField(formRefs, this.state.card, 'bathrooms');
  },

  render: function() {
    return (<CardForm ref='form' handleSubmit={this.update} />);
  }
});
