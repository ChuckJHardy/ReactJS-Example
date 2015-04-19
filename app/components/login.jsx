'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var Router = require('react-router');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Login',

  contextTypes: {
    router: React.PropTypes.func
  },

  handlePasswordReset: function(e) {
    this.context.router.transitionTo('password_reset');
  },
  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToFirebase(
      this.refs.email.getDOMNode().value.trim(),
      this.refs.password.getDOMNode().value.trim()
    );
  },
  handlerSuccess: function(data) {
    App.warden.login(data.uid);
    this.context.router.replaceWith('dashboard');
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.find(
      App.firebase,
      email,
      password,
      function() {},
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
            <input ref='password' type='text' required />
          </div>
          <div className='form-field'>
            <a onClick={this.handlePasswordReset} className="forgot-link">Forgot your password?</a>
          </div>
          <div className='form-field'>
            <input type='submit' value='Login' className='btn' />
          </div>
        </form>
      </div>
    );
  }
});
