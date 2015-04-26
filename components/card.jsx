'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    record: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className='card'>
        <div className='card-inner'>
          <div className='card-image'>
            <img src='http://placehold.it/350x250' />
          </div>
          <div className='card-content'>
            <header className='card-name'>
              <a href='#'>{this.props.record.price}</a>
            </header>
            <div className='card-heading2'>{this.props.record.description}</div>
            <div className='card-heading3'>{this.props.record.location}</div>
          </div>
        </div>
      </div>
    );
  }
});
