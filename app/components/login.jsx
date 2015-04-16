'use strict';

var React = require('react');

var logoImage = require('../assets/images/logo-big.png');

module.exports = React.createClass({
  displayName: 'Login',

  render: function() {
    return (
      <div>
        <img src={logoImage} alt='' className='hero-logo' />
        <div className='hero-title'>Login</div>
        <form className='hero-form'>
          <div className='form-field'>
            <label>Email</label>
            <input type='text' autofocus required />
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input type='text' required />
          </div>
          <div className='form-field'>
            <input type='submit' value='Login' className='btn' />
          </div>
        </form>
      </div>
    );
  }
});
