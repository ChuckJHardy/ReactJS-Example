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
    var routePath = this.context.router.getCurrentPathname();

    switch(routePath) {
      case '/bye':
      case '/login':
        return <Link to='register' className='btn btn-default'>Register</Link>;
      case '/register':
      case '/logout':
      case '/password_reset':
        return <Link to='login' className='btn btn-default'>Login</Link>;
      case '/':
      case '/dashboard':
      case '/new_card':
        return <div>
          <Link to='account' className='btn btn-default'>Account</Link>
          <Link to='logout' className='btn btn-default'>Logout</Link>
        </div>;
      default:
        return <Link to='logout' className='btn btn-default'>Logout</Link>;
    }
  },

  render: function() {
    return (
      <nav>
        {this.renderAuthLink()}
      </nav>
    );
  }
});
