'use strict';

jest.dontMock('../app');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var Router = require('react-router');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('App', function () {
  var App = require('../app');

  var subject = function(stub, callback) {
    stub = stub || {};

    var Wrapper = StubRouterContent.wrapper(App, {}, stub, callback);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  describe('#getInitialState', function () {
    it('alerts danger is set', function() {
      subject({}, function(component) {
        expect(component.state.alerts.danger).toEqual(null);
      });
    });
  });

  describe('.warden', function () {
    it('returns warden instance', function() {
      expect(App.warden).toBeDefined();
    });
  });

  describe('.firebase', function () {
    it('returns firebase instance', function() {
      expect(App.firebase).toBeDefined();
    });
  });
});
