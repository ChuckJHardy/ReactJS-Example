'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

jest.dontMock('../login');

describe('Login', function () {
  var Login = require('../login');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Login />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Email');
  });
});
