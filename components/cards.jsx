'use strict';

var React = require('react');
var Card = require('./card');

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
      <ul>
        {records.map(this._renderCard)}
      </ul>
    );
  }
});
