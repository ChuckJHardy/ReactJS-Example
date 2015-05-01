'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var CardForm = require('../components/card_form');

module.exports = React.createClass({
  displayName: 'NewCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setAlert: React.PropTypes.func.isRequired,
  },

  create: function(data) {
    FirebaseService.cards.create(
      App.firebase(),
      App.warden.getLocalStorageUser(),
      data,
      this.handlerError,
      this.handlerSuccess
    );
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function(data) {
    this.context.router.transitionTo('/');
  },

  render: function() {
    return (<CardForm handleSubmit={this.create} />);
  }
});
