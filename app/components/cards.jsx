'use strict';

import React from 'react';
import Card from './card';

var records = [
  { id: 1, town: 'Falmouth', price: '£500,000' },
  { id: 2, town: 'Manchester', price: '£541,000' },
  { id: 3, town: 'London', price: '£918,000' },
];

export default class Cards extends React.Component {
  _renderCard (record) {
    return <Card key={record.id} record={record} />;
  }

  render () {
    return (
      <ul>
        {records.map(this._renderCard)}
      </ul>
    );
  }
}

Cards.displayName = 'Cards';
