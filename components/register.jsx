'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var Router = require('react-router');

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
  handlerSuccess: function(data) {
    App.warden.login(data.uid);
    this.context.router.replaceWith('dashboard');
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.create(
      App.firebase,
      email,
      password,
      this.handlerEmailTaken,
      this.handlerInvalidEmail,
      this.handlerError,
      this.handlerSuccess
    );
  },
  renderErrorElement: function() {
    if (this.state.emailTaken) {
      return <div className="form-error-message">Email Taken</div>;
    } else if (this.state.invalidEmail) {
      return <div className="form-error-message">Invalid Email Address</div>;
    }
  },

  formElementClassNames: function() {
    if (this.state.emailTaken || this.state.invalidEmail) {
      return 'form-field form-field-error';
    } else {
      return 'form-field';
    }
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Register</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className={this.formElementClassNames()}>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
            {this.renderErrorElement()}
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input ref='password' type='password' required />
          </div>
          <div className='form-field'>
            <input type='submit' value='Register' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
