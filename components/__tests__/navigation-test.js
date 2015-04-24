'use strict';

jest.dontMock('../navigation');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('Navigation', function () {
  var Navigation = require('../navigation');

  function test(path, link) {
    it('renders expected link', function() {
      expect(subject({
        getCurrentPathname: function() { return path; }
      }).getDOMNode().textContent).toContain(link);
    });
  }

  var subject = function(stub) {
    var Wrapper = StubRouterContent.wrapper(Navigation, {}, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  test('/bye', 'Register');
  test('/login', 'Register');
  test('/register', 'Login');
  test('/logout', 'Login');
  test('/password_reset', 'Login');
  test('/', 'Account');
  test('/', 'Logout');
  test('/dashboard', 'Account');
  test('/dashboard', 'Logout');
  test('/new_card', 'Account');
  test('/new_card', 'Logout');
  test('/not_a_valid_path', 'Logout');
});
