'use strict';

var React = require('react');

var App = require('../components/app');
var FirebaseService = require('../services/firebase_service');
var GetFormData = require('get-form-data');

module.exports = React.createClass({
  displayName: 'NewCard',

  contextTypes: {
    router: React.PropTypes.func
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.sendToFirebase(
      new GetFormData(this.refs.form.getDOMNode(), { trim: true })
    );
  },
  handlerError: function(error) {
    this.props.setAlert('Something failed. Developers have been informed.');
  },
  handlerSuccess: function(data) {
    this.context.router.transitionTo('/');
  },
  sendToFirebase: function(data) {
    FirebaseService.cards.create(
      App.firebase,
      App.warden.getLocalStorageUser(),
      data,
      this.handlerError,
      this.handlerSuccess
    );
  },

  render: function() {
    return (
      <div className='container'>
        <form ref='form' onSubmit={this.handleSubmit}>
          <div className='col-6'>
            <div className='form-field'>
              <label>Location</label>
              <input type='text' name='location' autofocus required />
            </div>
            <div className='form-field'>
              <label>Price</label>
              <input type='text' name='price' required />
            </div>
            <div className='form-field'>
              <label>Description</label>
              <textarea name='description'></textarea>
            </div>
            <div className='form-field'>
              <label>Rooms</label>
              <div className='select-menu'>
                <select name='rooms'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
            </div>
            <div className='form-field'>
              <label>Bathrooms</label>
              <div className='select-menu'>
                <select name='bathrooms'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='card-detail-empty-image'>No image</div>
            <div className='form-field'>
              <a href='#' className='btn btn-default'>Add an image</a>
            </div>
          </div>
          <div className='form-action'>
            <input type='submit' value='Add' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
