'use strict';

jest.dontMock('../card_form');
jest.dontMock('get-form-data');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('CardForm', function() {
  var CardForm = require('../card_form');

  var asserts = {};

  var address = 'testAddress';
  var price = 'testPrice';
  var description = 'testDescription';
  var bedrooms = '3';
  var bathrooms = '6';

  var submitLabel = 'testSubmitLabel';

  var handleSubmit = function(data) {
    asserts['handleSubmit'] = data;
  };

  var subject = function() {
    var card = TestUtils.renderIntoDocument(
      <CardForm
        submitLabel={submitLabel}
        handleSubmit={handleSubmit}
      />
    );

    card.refs.location.getDOMNode().value = address;
    card.refs.price.getDOMNode().value = price;
    card.refs.description.getDOMNode().value = description;
    card.refs.bedrooms.getDOMNode().value = bedrooms;
    card.refs.bathrooms.getDOMNode().value = bathrooms;

    return card;
  };

  it('renders with expected submit label', function() {
    expect(subject().getDOMNode().innerHTML).toContain(submitLabel);
  });

  it('calls handleSubmit with expected arguments', function() {
    var localSubject = subject();

    TestUtils.Simulate.submit(localSubject.refs.form.getDOMNode());

    expect(asserts.handleSubmit).toEqual({
      bathrooms: '6',
      bedrooms: '3',
      description: 'testDescription',
      location: 'testAddress',
      price: 'testPrice'
    });
  });
});
