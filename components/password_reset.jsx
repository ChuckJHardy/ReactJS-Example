'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var Router = require('react-router');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'PasswordReset',

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    this.populateFormValuesFromQuery();
  },

  grabEmail: function() {
    return this.refs.email.getDOMNode().value.trim();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.sendToFirebase(this.grabEmail());
  },
  populateFormValuesFromQuery: function() {
    if (this.context.router) {
      var passedEmail = this.context.router.getCurrentQuery().email;

      if (passedEmail) {
        this.refs.email.getDOMNode().value = passedEmail;
      }
    }
  },
  sendToFirebase: function(email) {
    FirebaseService.users.resetPassword(
      App.firebase,
      email,
      function() {},
      function() {},
      this.handlerSuccess
    );
  },
  handlerSuccess: function() {
    this.context.router.transitionTo('login', {}, { email: this.grabEmail() });
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Password Reset</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className='form-field'>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
          </div>
          <div className='form-field'>
            <input type='submit' value='Reset' className='btn' />
          </div>
        </form>
      </div>
    );
  }
});
