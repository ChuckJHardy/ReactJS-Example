'use strict';

jest.dontMock('../new_card');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('NewCard', function () {
  var NewCard = require('../new_card');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <NewCard />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Bathrooms');
  });
});
