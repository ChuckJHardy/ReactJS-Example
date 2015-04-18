'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'Navigation',

  contextTypes: {
    router: React.PropTypes.func
  },

  renderAuthLink: function() {
    console.log(this.context.router);
    var routePath = this.context.router.getCurrentPathname()

    switch(routePath) {
      case '/login':
        return <Link to='register' className='btn'>Register</Link>;
        break;
      case '/register':
      case '/logout':
        return <Link to='login' className='btn'>Login</Link>;
        break;
      case '/logout':
        break;
      default:
        return <Link to='logout' className='btn'>Logout</Link>;
    }  
  },

  render: function() {
    return (
      <div className='header-nav'>
        {this.renderAuthLink()}
      </div>
    );
  }
});
