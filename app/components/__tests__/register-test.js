'use strict';

jest.dontMock('../register');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

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
