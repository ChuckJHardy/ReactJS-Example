'use strict';

jest.dontMock('../new_card_container');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('NewCardContainer', function() {
  var NewCardContainer = require('../new_card_container');
  var CardForm = require('../card_form');

  var asserts = {};
  var adapter = jest.genMockFn();

  var subject = function() {
    var Wrapper = StubRouterContent.wrapper(NewCardContainer, {
      setAlert: function(text) {
        asserts['setAlert'] = text;
      }
    }, {
      getCurrentParams: function() {
        return {
          cardId: cardId,
        };
      },
      transitionTo: function(route) {
        asserts['transitionTo'] = route;
      }
    });

    return TestUtils.renderIntoDocument(<Wrapper />);
  };

  beforeEach(function() {
    FirebaseService.cards.update = jest.genMockFunction();
    App.firebase = jest.genMockFunction().mockReturnValue(adapter);
    App.warden = {
      getLocalStorageUser: function() { return '22'; }
    };
  });

  it('renders cards', function() {
    var RC = TestUtils.scryRenderedComponentsWithType(subject(), CardForm);
    expect(RC.length).toEqual(1);
  });

  describe('#handlerError', function() {
    it('calls setAlert', function() {
      subject().refs.component.handlerError();
      expect(asserts.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#create', function() {
    it('redirects when text matches', function() {
      var localSubject = subject();
      var data = { 'something' : 'else' };

      localSubject.refs.component.create(data);

      expect(FirebaseService.cards.create).toBeCalledWith(
        adapter,
        App.warden.getLocalStorageUser(),
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
      expect(asserts.transitionTo).toEqual('/');
    });
  });
});
