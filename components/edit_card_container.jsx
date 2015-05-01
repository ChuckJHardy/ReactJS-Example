'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var CardForm = require('../components/card_form');

module.exports = React.createClass({
  displayName: 'EditCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setAlert: React.PropTypes.func.isRequired,
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
  update: function(data) {
    FirebaseService.cards.update(
      App.firebase(),
      this.getCardId(),
      data,
      this.handlerError,
      this.handlerSuccess
    );
  },

  render: function() {
    return (<CardForm handleSubmit={this.update} />);
  }
});
