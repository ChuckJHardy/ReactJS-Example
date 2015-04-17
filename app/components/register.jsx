'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Register',

  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToFirebase(
      this.refs.email.getDOMNode().value.trim(),
      this.refs.password.getDOMNode().value.trim()
    );
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.create(
      App.firebase,
      email,
      password,
      function() {},
      function() {},
      function() {},
      function() {}
    )
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Register</div>
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
            <input type='submit' value='Register' className='btn' />
          </div>
        </form>
      </div>
    );
  }
});
