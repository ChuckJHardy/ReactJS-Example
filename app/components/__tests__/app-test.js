'use strict';

jest.dontMock('../app');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var Assign = require('react/lib/Object.assign');

describe('App', function () {
  var App = require('../app');

  var subject = function(args) {
    args = args || {};

    var defaults = {
    };

    data = Assign(defaults, args);

    return TestUtils.renderIntoDocument(
      <App />
    );
  };

  describe('.firebase', function () {
    it('returns firebase instance', function() {
      expect(App.firebase).toBeDefined();
    });
  });
});
