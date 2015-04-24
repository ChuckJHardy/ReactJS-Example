'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'NewCard',

  render: function() {
    return (
      <div className="container">
        <form>
          <div className="col-6">
            <div className="form-field">
              <label>Location</label>
              <input type="text" autofocus required />
            </div>
            <div className="form-field">
              <label>Price</label>
              <input type="text" />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea></textarea>
            </div>
            <div className="form-field">
              <label>Rooms</label>
              <div className="select-menu">
                <select>
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Bathrooms</label>
              <div className="select-menu">
                <select>
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-detail-empty-image">No image</div>
            <div className="form-field">
              <a href="#" className="btn btn-default">Add an image</a>
            </div>
          </div>
          <div className="form-action">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
});
