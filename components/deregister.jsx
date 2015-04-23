'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var Router = require('react-router');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Deregister',

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      invalidPassword: false,
    };
  },

  formElementClassNames: function() {
    if (this.state.invalidPassword) {
      return 'form-field form-field-error';
    } else {
      return 'form-field';
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();

    if (window.confirm('Are you sure?')) {
      this.sendToFirebase(
        this.refs.email.getDOMNode().value.trim(),
        this.refs.password.getDOMNode().value.trim()
      );
    }
  },
  handlerInvalidUser: function() {
    this.props.setAlert('Nope, its confirmed, you dont exist');
  },
  handlerInvalidPassword: function() {
    this.setState({ invalidPassword: true });
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function(data) {
    App.warden.logout();
    this.context.router.replaceWith('/bye');
  },
  sendToFirebase: function(email, password) {
    FirebaseService.users.destroy(
      App.firebase,
      email,
      password,
      this.handlerInvalidUser,
      this.handlerInvalidPassword,
      this.handlerError,
      this.handlerSuccess
    );
  },
  renderErrorElement: function() {
    if (this.state.invalidPassword) {
      return <div className="form-error-message">Incorrect Password</div>;
    }
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Delete Account</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className='form-field'>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
          </div>
          <div className={this.formElementClassNames()}>
            <label>Password</label>
            <input ref='password' type='password' required />
            {this.renderErrorElement()}
          </div>
          <div className='form-field'>
            <input type='submit' value='Confirm' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
