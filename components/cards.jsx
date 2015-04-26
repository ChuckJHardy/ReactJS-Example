'use strict';

var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

var Card = require('./card');

var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'Cards',

  renderCard: function(record, key) {
    return <Card key={key} record={record} />;
  },

  render: function() {
    return (
      <div className='cards'>
        <div className='cards-filter'>
          <a href='#' className='filter'>Bedrooms</a>
          <a href='#' className='filter'>Price</a>
          <a href='#' className='filter'>Bathrooms</a>
        </div>
        <div className='add-card'>
          <Link to='new_card' className='btn btn-primary'>Add a new property</Link>
        </div>

        {_.map(this.props.cards, this.renderCard)}
      </div>
    );
  }
});
