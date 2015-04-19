'use strict';

jest.dontMock('../navigation');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('Navigation', function () {
  var Navigation = require('../navigation');

  var subject = function(stub) {
    var Wrapper = StubRouterContent(Navigation, {}, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  describe('/login', function () {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return '/login'; }
      }).getDOMNode().textContent).toContain('Register');
    });
  });

  describe('/register', function () {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return '/register'; }
      }).getDOMNode().textContent).toContain('Login');
    });
  });

  describe('/logout', function () {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return '/logout'; }
      }).getDOMNode().textContent).toContain('Login');
    });
  });

  describe('/password_reset', function () {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return '/password_reset'; }
      }).getDOMNode().textContent).toContain('Login');
    });
  });

  describe('/not_a_valid_path', function () {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return '/not_a_valid_path'; }
      }).getDOMNode().textContent).toContain('Logout');
    });
  });
});
