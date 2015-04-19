'use strict';

jest.dontMock('../card');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var Assign = require('react/lib/Object.assign');

describe('Card', function () {
  var Card = require('../card');

  var subject = function(args) {
    args = args || {};

    var defaults = {
      record: {
        id: 123,
        town: 'testTown',
        price: '£5'
      }
    };

    data = Assign(defaults, args);

    return TestUtils.renderIntoDocument(
      <Card record={data.record} />
    );
  };

  it('renders id', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.id);
  });

  it('renders town', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.town);
  });

  it('renders price', function() {
    expect(subject().getDOMNode().innerHTML)
      .toContain(data.record.price);
  });
});
