'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var TextInput = require('../helpers/text_input');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Register',

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      invalidEmail: false,
      emailTaken: false
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToFirebase(
      this.refs.email.getDOMNode().value.trim(),
      this.refs.password.getDOMNode().value.trim()
    );
  },
  handlerEmailTaken: function() {
    this.setState({ emailTaken: true });
  },
  handlerInvalidEmail: function() {
    this.setState({ invalidEmail: true });
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerLockdown: function(error) {
    this.props.setAlert(error);
  },
  handlerSuccess: function(data) {
    App.warden.login(data.uid);
    this.context.router.replaceWith('dashboard');
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.create(
      App.firebase(),
      email,
      password,
      this.handlerEmailTaken,
      this.handlerInvalidEmail,
      this.handlerError,
      this.handlerSuccess,
      this.handlerLockdown
    );
  },
  renderEmailElement: function() {
    var error;

    if (this.state.emailTaken) {
      error = 'Email Taken';
    } else if (this.state.invalidEmail) {
      error = 'Invalid Email Address';
    }

    return TextInput.render('Email', 'email', {
      autofocus: true,
      required: true
    }, error);
  },
  renderPasswordElement: function() {
    return TextInput.render('Password', 'password', {
      required: true
    });
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Register</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          {this.renderEmailElement()}
          {this.renderPasswordElement()}
          <div className='form-field'>
            <input type='submit' value='Register' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
