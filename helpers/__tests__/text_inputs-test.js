'use strict';

jest.dontMock('../text_input');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('TextInput', function () {
  var TextInput = require('../text_input');

  var subject = function(error, options) {
    options = options = {
      required: true,
      autofocus: true,
    };

    var Component = React.createClass({
      render: function() {
        return TextInput.render('Email', 'email', options, error);
      }
    });
    
    return TestUtils.renderIntoDocument(<Component />);
  };

  it('renders label text', function() {
    expect(subject().getDOMNode().innerHTML).toContain('Email');
  });

  it('renders label name', function() {
    expect(subject().getDOMNode().innerHTML).toContain('email');
  });

  it('renders label type', function() {
    expect(subject().getDOMNode().innerHTML).toContain('text');
  });

  it('renders with required', function() {
    expect(subject().getDOMNode().innerHTML).toContain('required');
  });

  it('renders error message', function() {
    var error = 'Oops';
    expect(subject(error).getDOMNode().innerHTML).toContain(error);
  });

  it('renders error class', function() {
    var error = 'Oops';
    expect(subject(error).getDOMNode().innerHTML).toContain('form-error-message');
  });
});
