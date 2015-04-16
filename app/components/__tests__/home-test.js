'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

jest.dontMock('../home');

describe('Home', function () {
  var Home = require('../home');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Home />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Unsecure Home Page');
  });
});
