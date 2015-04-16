'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

jest.dontMock('../register');

describe('Register', function () {
  var Register = require('../register');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Register />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Email');
  });
});
