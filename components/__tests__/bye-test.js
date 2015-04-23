'use strict';

jest.dontMock('../bye');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Bye', function () {
  var Bye = require('../bye');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Bye />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Sad to see you leave.');
  });
});
