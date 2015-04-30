'use strict';

var React = require('react');

var App = require('../components/app');
var DestroyCard = require('./destroy_card');
var FirebaseService = require('../services/firebase_service');

var confirmationText = 'confirm';

function canDestroy(text) { return text.toLowerCase() === confirmationText; }

module.exports = React.createClass({
  displayName: 'DestroyCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setAlert: React.PropTypes.func.isRequired,
  },

  destroy: function(typedText) {
    if (canDestroy(typedText)) {
      this.sendToFirebase();
    } else {
      this.setAlert(typedText);
    }
  },
  getCardId: function() {
    return this.context.router.getCurrentParams().cardId;
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function() {
    this.context.router.replaceWith('dashboard');
  },
  sendToFirebase: function() {
    FirebaseService.cards.destroy(
      App.firebase(),
      this.getCardId(),
      this.handlerError,
      this.handlerSuccess
    );
  },
  setAlert: function(typedText) {
    this.props.setAlert(
      'You typed ' +
      typedText +
      '. You should have typed ' +
      confirmationText +
      '.'
    );
  },

  render: function() {
    return <DestroyCard
      destroy={this.destroy}
      confirmationText={confirmationText}
    />;
  }
});
