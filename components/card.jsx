'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

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
              <Link to='show_card' params={{cardId: this.props.id}}>{this.props.record.price}</Link>
            </header>
            <div className='card-heading2'>{this.props.record.description}</div>
            <div className='card-heading3'>{this.props.record.location}</div>
          </div>
        </div>
      </div>
    );
  }
});
