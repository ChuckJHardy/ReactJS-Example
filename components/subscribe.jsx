'use strict';

var React = require('react');
var jQuery = require('jquery');

var App = require('../components/app');
var MailchimpService = require('../services/mailchimp_service');
var Router = require('react-router');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Subscribe',

  contextTypes: {
    router: React.PropTypes.func
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToMailchimp(
      this.refs.email.getDOMNode().value.trim()
    );
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function(data) {
    // Change Button Text
  },
  sendToMailchimp: function(email) {
    MailchimpService.subscribe(
      jQuery,
      email,
      this.handlerError,
      this.handlerSuccess
    );
  },

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Subscribe</div>
        <form className='hero-form' onSubmit={this.handleSubmit}>
          <div className='form-field'>
            <label>Email</label>
            <input ref='email' type='text' autofocus required />
          </div>
          <div className='form-field'>
            <input type='submit' value='Subscribe' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
