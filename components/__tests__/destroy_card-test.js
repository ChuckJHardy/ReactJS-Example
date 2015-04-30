'use strict';

jest.dontMock('../destroy_card');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('DestroyCard', function () {
  var DestroyCard = require('../destroy_card');

  var asserts = {};
  var confirmationText = 'testConfirm';
  var destroy = function(text) { asserts['destroy'] = text; };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <DestroyCard
        destroy={destroy}
        confirmationText={confirmationText}
      />
    );
  };

  it('renders instructional text', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Type `testConfirm`');
  });

  it('triggers destroy with expected arguments', function() {
    var localSubject = subject();
    var input = React.findDOMNode(localSubject.refs.confirmation);
    var submit = React.findDOMNode(localSubject.refs.submit);

    input.value = confirmationText + ' ';
    TestUtils.Simulate.click(submit);

    expect(asserts.destroy).toEqual(confirmationText);
  });
});
