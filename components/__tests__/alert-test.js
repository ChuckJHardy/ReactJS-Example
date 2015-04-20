'use strict';

jest.dontMock('../alert');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Alert', function () {
  var Alert = require('../alert');

  var subject = function(message) {
    return TestUtils.renderIntoDocument(
      <Alert message={message} />
    );
  };

  describe('With Message', function () {
    var message = 'Hello';

    it('renders message', function() {
      expect(subject(message).getDOMNode().textContent)
        .toContain(message);
    });

    it('renders with alert class', function() {
      var divs = TestUtils.scryRenderedDOMComponentsWithClass(subject(message), 'alert');
      expect(divs.length).toEqual(1);
    });

    it('renders with alert-danger class', function() {
      var divs = TestUtils.scryRenderedDOMComponentsWithClass(subject(message), 'alert-danger');
      expect(divs.length).toEqual(1);
    });
  });

  describe('Without Message', function () {
    var message = null;

    it('renders with alert-null class', function() {
      var divs = TestUtils.scryRenderedDOMComponentsWithClass(subject(message), 'alert-null');
      expect(divs.length).toEqual(1);
    });
  });
});
