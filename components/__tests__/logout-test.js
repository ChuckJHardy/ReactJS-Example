'use strict';

jest.dontMock('../logout');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

var App = require('../app');

describe('Logout', function () {
  var Logout = require('../logout');

  var mockWarden = {
    logout: jest.genMockFn()
  };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Logout />
    );
  };

  beforeEach(function() {
    App.warden = mockWarden;
  });

  it('calls off to App Warden for logout', function() {
    subject();
    expect(mockWarden.logout).toBeCalled();
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Bye');
  });
});
