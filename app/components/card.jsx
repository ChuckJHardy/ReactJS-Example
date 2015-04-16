'use strict';

import React from 'react';

export default class Card extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <img src={'http://placehold.it/300&text=' + this.props.record.id} />
          <h1>{this.props.record.town}</h1>
          <h2>{this.props.record.price}</h2>
        </li>
      </ul>
    );
  }
}

Card.displayName = 'Card';
Card.propTypes = {
  record: React.PropTypes.object.isRequired,
};
