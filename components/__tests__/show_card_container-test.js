'use strict';

jest.dontMock('../show_card_container');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

describe('ShowCard', function() {
  var ShowCardContainer= require('../show_card_container');
  var ShowCard = require('../show_card');
  var CardsAction = require('../../actions/cards_action');
  var CardsStore = require('../../stores/cards_store');

  var cardId = '-JnrJpdjoBsiL-aRq16l';
  var asserts = {};

  var subject = function(card) {
    CardsAction.find = jest.genMockFunction();
    CardsStore.card = jest.genMockFunction().mockReturnValue(card);

    var Wrapper = StubRouterContent.wrapper(ShowCardContainer, {}, {
      getCurrentParams: function() {
        return {
          cardId: cardId,
        };
      },
      transitionTo: function(name, args) {
        asserts['destroyName'] = name;
        asserts['destroyArgs'] = args;
      }
    });

    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  it('sets cards state onChange', function() {
    var localSubject = subject({});
    localSubject.refs.component.onChange();

    expect(CardsStore.card.mock.calls.length).toEqual(2);
  });

  it('calls CardsAction on mount', function() {
    subject({});
    expect(CardsAction.find).toBeCalledWith(cardId);
  });

  it('addChangeListener is assigned on mount', function() {
    var localSubject = subject({});
    expect(CardsStore.addChangeListener)
      .toBeCalledWith(localSubject.refs.component.onChange);
  });

  it('removeChangeListener is assigned on unmount', function() {
    var localSubject = subject({});
    localSubject.refs.component.componentWillUnmount();
    expect(CardsStore.removeChangeListener)
      .toBeCalledWith(localSubject.refs.component.onChange);
  });

  it('transition to edit card on edit call', function() {
    var localSubject = subject({});
    localSubject.refs.component.edit();

    expect(asserts.destroyName).toEqual('edit_card');
    expect(asserts.destroyArgs).toEqual({ cardId: cardId });
  });

  it('transition to destroy card on destroy call', function() {
    var localSubject = subject({});
    localSubject.refs.component.destroy();

    expect(asserts.destroyName).toEqual('destroy_card');
    expect(asserts.destroyArgs).toEqual({ cardId: cardId });
  });

  it('renders ShowCard component', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject({}), ShowCard);
    expect(RC.length).toEqual(1);
  });
});
