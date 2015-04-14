var React = require('react');

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    record: React.PropTypes.object.isRequired,  
  },

  render: function() {
    return <ul>
      <li>
        <img src={'http://placehold.it/300&text=' + this.props.record.id} />
        <h1>{this.props.record.town}</h1>
        <h2>{this.props.record.price}</h2>
      </li>
    </ul>;
  }
});
