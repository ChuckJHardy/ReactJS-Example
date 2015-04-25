'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Login',

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    this.populateFormValuesFromQuery();
  },

  grabEmail: function() {
    return this.refs.email.getDOMNode().value.trim();
  },
  handlePasswordReset: function(e) {
    this.context.router.transitionTo('password_reset', {}, { email: this.grabEmail() });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToFirebase(
      this.grabEmail(),
      this.refs.password.getDOMNode().value.trim()
    );
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function(data) {
    App.warden.login(data.uid);
    this.context.router.replaceWith('dashboard');
  },
  populateFormValuesFromQuery: function() {
    if (this.context.router) {
      var passedEmail = this.context.router.getCurrentQuery().email;

      if (passedEmail) {
        this.refs.email.getDOMNode().value = passedEmail;
      }
    }
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.find(
      App.firebase,
      email,
      password,
      this.handlerError,
      this.handlerSuccess
    );
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Login</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className='form-field'>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input ref='password' type='password' required />
          </div>
          <div className='form-field'>
            <a onClick={this.handlePasswordReset} className="forgot-link">Forgot your password?</a>
          </div>
          <div className='form-field'>
            <input type='submit' value='Login' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
