'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var logoImage = require('../assets/images/logo-empty-state.png');

module.exports = React.createClass({
  displayName: 'NoCards',

  render: function() {
    return (
      <div className="cards-empty">
        <img src={logoImage} alt='' />
        <div className="cards-empty-message">You haven't added a property yet.</div>
        <Link to='new_card' className='btn btn-primary'>Add a property</Link>
      </div>
    );
  }
});
