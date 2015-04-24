'use strict';

jest.dontMock('../dashboard');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('Dashboard', function () {
  var Dashboard = require('../dashboard');

  var subject = function(stub) {
    var Wrapper = StubRouterContent.wrapper(Dashboard, {}, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Add a new property');
  });
});
