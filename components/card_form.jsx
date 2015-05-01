'use strict';

var React = require('react');

var GetFormData = require('get-form-data');

module.exports = React.createClass({
  displayName: 'CardForm',

  propTypes: {
    submitLabel: React.PropTypes.string.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.props.handleSubmit(
      new GetFormData(this.refs.form.getDOMNode(), { trim: true })
    );
  },

  render: function() {
    return (
      <div className='container'>
        <form ref='form' onSubmit={this.handleSubmit}>
          <div className='col-6'>
            <div className='form-field'>
              <label>Location</label>
              <input ref='location' type='text' name='location' autofocus required />
            </div>
            <div className='form-field'>
              <label>Price</label>
              <input ref='price' type='text' name='price' required />
            </div>
            <div className='form-field'>
              <label>Description</label>
              <textarea ref='description' name='description'></textarea>
            </div>
            <div className='form-field'>
              <label>Rooms</label>
              <div className='select-menu'>
                <select ref='bedrooms' name='bedrooms'>
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
                <select ref='bathrooms' name='bathrooms'>
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
            <input ref='submit' type='submit' value={this.props.submitLabel} className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
});
