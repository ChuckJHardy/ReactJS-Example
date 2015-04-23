'use strict';

jest.dontMock('../deregister');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Deregister', function () {
  var Deregister = require('../deregister');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Deregister />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Deregister');
  });
});
