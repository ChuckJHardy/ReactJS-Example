'use strict';

jest.dontMock('../account');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Account', function () {
  var Account = require('../account');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Account />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Account');
  });
});
