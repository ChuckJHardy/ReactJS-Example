'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'DestroyCard',

  propTypes: {
    confirmationText: React.PropTypes.string.isRequired,
    destroy: React.PropTypes.func.isRequired,
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.destroy(this.refs.confirmation.getDOMNode().value.trim());
  },

  render: function() {
    return (
      <div>
        <div className='hero-title'>Delete Property</div>
        <form className='hero-form' >
          <div className='form-field'>
            <label>Type `{this.props.confirmationText}`</label>
            <input ref='confirmation' type='text' autofocus required />
          </div>
          <div className='form-field'>
            <input type='submit' ref='submit' onClick={this.handleSubmit} value='Delete' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
