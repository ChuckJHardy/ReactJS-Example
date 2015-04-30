'use strict';

jest.dontMock('../destroy_card_container');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('DestroyCardContainer', function () {
  var DestroyCardContainer = require('../destroy_card_container');
  var DestroyCard = require('../destroy_card');

  var asserts = {};
  var adapter = jest.genMockFn();
  var cardId = '-JnrJpdjoBsiL-aRq16l';

  var subject = function() {
    var Wrapper = StubRouterContent.wrapper(DestroyCardContainer, {
      setAlert: function(text) {
        asserts['setAlert'] = text;
      }
    }, {
      getCurrentParams: function() {
        return {
          cardId: cardId,
        };
      },
      replaceWith: function(route) {
        asserts['replaceWith'] = route;
      }
    });

    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  beforeEach(function() {
    FirebaseService.cards.destroy = jest.genMockFunction();
    App.firebase = jest.genMockFunction().mockReturnValue(adapter);
  });

  it('renders cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject(), DestroyCard);
    expect(RC.length).toEqual(1);
  });

  describe('#getCardId', function() {
    it('returns card id from route', function() {
      expect(subject().refs.component.getCardId()).toEqual(cardId);
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
      expect(asserts.replaceWith).toEqual('dashboard');
    });
  });

  describe('#destroy', function() {
    it('redirects when text matches', function() {
      var localSubject = subject();

      localSubject.refs.component.destroy('confirm');

      expect(FirebaseService.cards.destroy).toBeCalledWith(
        adapter,
        cardId,
        function() {},
        function() {}
      );
    });

    it('sets alert when text matches', function() {
      subject().refs.component.destroy('somethingWrong');
      expect(asserts.setAlert).toEqual('You typed somethingWrong. You should have typed confirm.');
    });
  });
});
