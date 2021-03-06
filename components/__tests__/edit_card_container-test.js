'use strict';

jest.dontMock('../edit_card_container');
jest.dontMock('../card_form');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('EditCardContainer', function() {
  var EditCardContainer = require('../edit_card_container');
  var CardForm = require('../card_form');
  var CardsAction = require('../../actions/cards_action');
  var CardsStore = require('../../stores/cards_store');

  var asserts = {};
  var adapter = jest.genMockFn();
  var cardId = '-JnrJpdjoBsiL-aRq16l';
  var card = {
    location: 'testLocation',
    price: 'testPrice',
    description: 'testDescription',
    bedrooms: '9',
    bathrooms: '10',
  };

  var subject = function() {
    var Wrapper = StubRouterContent.wrapper(EditCardContainer, {
      setAlert: function(text) {
        asserts['setAlert'] = text;
      }
    }, {
      getCurrentParams: function() {
        return {
          cardId: cardId,
        };
      },
      replaceWith: function(route, params, query) {
        asserts['replaceWith'] = {
          route: route,
          params: params,
          query: query
        };
      }
    });

    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  beforeEach(function() {
    FirebaseService.cards.update = jest.genMockFunction();
    App.firebase = jest.genMockFunction().mockReturnValue(adapter);
    CardsStore.card = jest.genMockFunction().mockReturnValue(card);
  });

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

  describe('#handlerError', function() {
    it('calls setAlert', function() {
      subject().refs.component.handlerError();
      expect(asserts.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#getCardId', function() {
    it('returns card id from route', function() {
      expect(subject().refs.component.getCardId()).toEqual(cardId);
    });
  });

  describe('#update', function() {
    it('redirects when text matches', function() {
      var localSubject = subject();
      var data = { 'something' : 'else' };

      localSubject.refs.component.update(data);

      expect(FirebaseService.cards.update).toBeCalledWith(
        adapter,
        cardId,
        data,
        function() {},
        function() {}
      );
    });
  });

  describe('#handlerError', function() {
    it('redirects when text matches', function() {
      subject().refs.component.handlerError();
      expect(asserts.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#handlerSuccess', function() {
    it('redirects when text matches', function() {
      subject().refs.component.handlerSuccess();
      expect(asserts.replaceWith).toEqual({
        route: 'show_card',
        params: { cardId: cardId },
        query: {}
      });
    });
  });

  it('renders cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject(), CardForm);
    expect(RC.length).toEqual(1);
  });

  it('populates fields', function() {
    localSubject = subject();

    expect(localSubject.getDOMNode().innerHTML).toContain(card.location);
    expect(localSubject.getDOMNode().innerHTML).toContain(card.price);
    expect(localSubject.getDOMNode().innerHTML).toContain(card.description);
    expect(localSubject.getDOMNode().innerHTML).toContain(card.bedrooms);
    expect(localSubject.getDOMNode().innerHTML).toContain(card.bathrooms);
  });
});
