'use strict';

var React = require('react');
var Router = require('react-router');

var Card = require('./card');

var Link = Router.Link;

var records = [
  { id: 1, town: 'Falmouth', price: '£500,000' },
  { id: 2, town: 'Manchester', price: '£541,000' },
  { id: 3, town: 'London', price: '£918,000' },
];

module.exports = React.createClass({
  displayName: 'Cards',

  _renderCard: function(record) {
    return <Card key={record.id} record={record} />;
  },

  render: function() {
    return (
      <div className="cards">
        <div className="cards-filter">
          <a href="#" className="filter">Filter</a>
          <a href="#" className="filter">Filter</a>
          <a href="#" className="filter">Filter</a>
        </div>
        <div className="add-card">
          <Link to='new_card' className='btn btn-primary'>Add a new property</Link>
        </div>

        {records.map(this._renderCard)}
      </div>
    );
  }
});
