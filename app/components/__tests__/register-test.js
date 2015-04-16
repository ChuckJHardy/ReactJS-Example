'use strict';

describe('Register', function () {
  var React = require('react');
  var TestUtils = require('react/lib/ReactTestUtils')
  var Register = require('../register');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Register />
    );
  };

  it('renders', function() {
    expect(subject()).not.toBeNull();
  });
});
