'use strict';

jest.dontMock('../show_card');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('ShowCard', function () {
  var ShowCard = require('../show_card');

  var subject = function() {
    return TestUtils.renderIntoDocument(<ShowCard />);
  };

  it('renders cards', function() {
    expect(subject().getDOMNode().innerHTML).toContain('$200,000');
  });
});
