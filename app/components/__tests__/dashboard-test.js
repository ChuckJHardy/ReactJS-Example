'use strict';

jest.dontMock('../dashboard');
jest.dontMock('../authenticated');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Dashboard', function () {
  var Dashboard = require('../dashboard');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Dashboard />
    );
  };

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Dashboard');
  });
});
