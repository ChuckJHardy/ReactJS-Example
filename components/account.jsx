'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'Account',

  render: function() {
    return (
      <div>
        <Link to='deregister' className='btn btn-default'>Delete Account</Link>
      </div>
    );
  }
});
