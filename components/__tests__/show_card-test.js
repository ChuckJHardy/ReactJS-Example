'use strict';

jest.dontMock('../show_card');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('ShowCard', function () {
  var ShowCard = require('../show_card');

  var card = {
    price: 'testPrice',
    location: 'testLocation',
    bedrooms: 'testBedrooms',
    bathrooms: 'testBathrooms'
  };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <ShowCard
        card={card}
        edit={jest.genMockFn()}
        destroy={jest.genMockFn()}
      />
    );
  };

  it('renders price', function() {
    expect(subject().getDOMNode().innerHTML).toContain(card.price);
  });

  it('renders location', function() {
    expect(subject().getDOMNode().innerHTML).toContain(card.location);
  });

  it('renders bedrooms', function() {
    expect(subject().getDOMNode().innerHTML).toContain(card.bedrooms);
  });

  it('renders bathrooms', function() {
    expect(subject().getDOMNode().innerHTML).toContain(card.bathrooms);
  });
});
