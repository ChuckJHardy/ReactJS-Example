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
    getCurrentQuery: function() {},
    isActive: function() {},
    getRouteAtDepth: function() {},
    setRouteComponentAtDepth: function() {}
  }, stubs);

  return RouterStub;
};

var Wrapper = function(Component, props, stubs) {
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

    render: function() {
      return <Component {...props} />;
    }
  });
};

module.exports = {
  stubber: Stubber,
  wrapper: Wrapper
};
