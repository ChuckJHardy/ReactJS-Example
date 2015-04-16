'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var Assign = require('react/lib/Object.assign');

jest.dontMock('../cards');

describe('Cards', function() {
  var Cards = require('../cards');
  var Card = require('../card');

  var subject = function(args) {
    args = args || {};

    var defaults = {};

    data = Assign(defaults, args);

    return TestUtils.renderIntoDocument(
      <Cards record={data.record} />
    );
  };

  it('renders cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject(), Card);
    expect(RC.length).toEqual(3);
  });
});
