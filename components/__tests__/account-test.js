'use strict';

jest.dontMock('../account');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('Account', function () {
  var Account = require('../account');

  var subject = function(stub) {
    var Wrapper = StubRouterContent.wrapper(Account, {}, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Delete Account');
  });
});
