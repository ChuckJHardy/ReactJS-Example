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

  getInitialState: function() {
    return {
      invalidUser: false,
    };
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
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerInvalidUser: function() {
    this.setState({ invalidUser: true });
  },
  handlerSuccess: function() {
    this.context.router.transitionTo('login', {}, { email: this.grabEmail() });
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
      this.handlerInvalidUser,
      this.handlerError,
      this.handlerSuccess
    );
  },
  renderErrorElement: function() {
    if (this.state.invalidUser) {
      return <div className="form-error-message">Invalid User</div>;
    }
  },
  formElementClassNames: function() {
    if (this.state.invalidUser) {
      return 'form-field form-field-error';
    } else {
      return 'form-field';
    }
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Password Reset</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className={this.formElementClassNames()}>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
            {this.renderErrorElement()}
          </div>
          <div className='form-field'>
            <input type='submit' value='Reset' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
