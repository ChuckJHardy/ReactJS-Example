'use strict';

jest.dontMock('../cards_container');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

describe('Cards', function() {
  var CardsContainer = require('../cards_container');
  var Cards = require('../cards');
  var NoCards = require('../no_cards');
  var CardsAction = require('../../actions/cards_action');
  var CardsStore = require('../../stores/cards_store');

  var subject = function(cards) {
    CardsAction.list = jest.genMockFunction();
    CardsStore.list = jest.genMockFunction().mockReturnValue(cards);

    return TestUtils.renderIntoDocument(
      <CardsContainer />
    );
  };

  it('calls CardsAction on mount', function() {
    subject({});
    expect(CardsAction.list).toBeCalled();
  });

  it('addChangeListener is assigned on mount', function() {
    var localSubject = subject({});
    expect(CardsStore.addChangeListener).toBeCalledWith(localSubject.onChange);
  });

  it('removeChangeListener is assigned on unmount', function() {
    var localSubject = subject({});
    localSubject.componentWillUnmount();
    expect(CardsStore.removeChangeListener).toBeCalledWith(localSubject.onChange);
  });

  it('sets cards state onChange', function() {
    var localSubject = subject({});
    localSubject.onChange();

    expect(CardsStore.list.mock.calls.length).toEqual(2);
  });

  it('renders Cards component', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject({
      1: {},
    }), Cards);
    expect(RC.length).toEqual(1);
  });

  it('renders NoCards component when there are not cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject({}), NoCards);
    expect(RC.length).toEqual(1);
  });
});
