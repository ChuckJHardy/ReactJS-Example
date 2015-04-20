'use strict';

var React = require('react');
var Assign = require('react/lib/Object.assign');

var RouterStub = function() {};
var Stubber = function(stubs) {
  Assign(RouterStub, {
    makePath: function() {},
    makeHref: function() {},
    transitionTo: function() {},
    replaceWith: function() {},
    goBack: function() {},
    getCurrentPath: function() {},
    getCurrentRoutes: function() {},
    getCurrentPathname: function() {},
    getCurrentParams: function() {},
    getCurrentQuery: function() { return {}; },
    isActive: function() {},
    getRouteAtDepth: function() {},
    setRouteComponentAtDepth: function() {}
  }, stubs);

  return RouterStub;
};

var Wrapper = function(Component, props, stubs, callback) {
  callback = callback || function() {};

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number
    },

    getChildContext: function() {
      return {
        router: Stubber(stubs),
        routeDepth: 0
      };
    },

    componentDidMount: function() {
      callback(this.refs.component)
    },

    render: function() {
      return <Component {...props} ref='component' />;
    }
  });
};

module.exports = {
  stubber: Stubber,
  wrapper: Wrapper
};
