'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    record: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className="card">
        <div className="card-inner">
          <div className="card-image">
            <img src={'http://placehold.it/350x250&text=' + this.props.record.id} />
          </div>
          <div className="card-content">
            <header className="card-name"><a href="#">Galena Park Place</a></header>
            <div className="card-heading2">{this.props.record.town}</div>
            <div className="card-heading3">{this.props.record.price}</div>
          </div>
        </div>
      </div>
    );
  }
});
