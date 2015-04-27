'use strict';

jest.dontMock('lodash');
jest.dontMock('../cards');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var Assign = require('react/lib/Object.assign');
var StubRouterContent = require('../../support/stub_router_context');

describe('Cards', function() {
  var Cards = require('../cards');
  var Card = require('../card');

  var props = {
    cards: {
      1: {},
      2: {},
      3: {},
    }
  };

  var subject = function(stub) {
    var Wrapper = StubRouterContent.wrapper(Cards, props, stub);
    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('renders cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject(), Card);
    expect(RC.length).toEqual(3);
  });
});
