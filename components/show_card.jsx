'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'ShowCard',

  propTypes: {
    card: React.PropTypes.object.isRequired,
    destroy: React.PropTypes.func.isRequired,
    edit: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <section className="card-detail">
        <div className="card-detail-gallery"></div>
        <div className="card-detail-info">
          <div className="card-detail-price">{this.props.card.price}</div>
          <a onClick={this.props.edit} className="btn btn-default btn-mini pull-right">edit</a>
          <a onClick={this.props.destroy} className="btn btn-default btn-mini pull-right">delete</a>
          <header className="card-detail-name">{this.props.card.location}</header>
          <ul className="card-detail-features">
            <li className="card-detail-feature"><span>bedrooms</span> {this.props.card.bedrooms}</li>
            <li className="card-detail-feature"><span>bathrooms</span> {this.props.card.bathrooms}</li>
          </ul>
          <div className="card-detail-descrip">{this.props.card.description}</div>
        </div>
      </section>
    );
  }
});
