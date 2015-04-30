'use strict';

jest.dontMock('../card');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var Assign = require('react/lib/Object.assign');
var StubRouterContent = require('../../support/stub_router_context');

describe('Card', function () {
  var Card = require('../card');

  var subject = function(args) {
    args = args || {};

    var defaults = {
      record: {
        id: '-JnrJpdjoBsiL-aRq16l',
        location: 'testLocation',
        description: 'testDescription',
        price: '£5'
      }
    };

    data = Assign(defaults, args);

    var Wrapper = StubRouterContent.wrapper(Card, {
      id: data.record.id,
      record: data.record
    }, {});

    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('renders description', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.description);
  });

  it('renders location', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.location);
  });

  it('renders price', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.price);
  });
});
