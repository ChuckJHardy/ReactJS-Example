'use strict';

jest.dontMock('../no_cards');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('NoCards', function () {
  var NoCards = require('../no_cards');

  var subject = function(stub) {
    var Wrapper = StubRouterContent.wrapper(NoCards, {}, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('renders', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain('Add a property');
  });
});
