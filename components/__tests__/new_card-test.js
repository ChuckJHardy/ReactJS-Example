'use strict';

jest.dontMock('../new_card');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('NewCard', function() {
  var NewCard = require('../new_card');

  var assets = {};
  var adapter = jest.genMockFn();

  var address = 'Address';
  var price = 'Price';
  var description = 'Description';
  var bedrooms = '4';
  var bathrooms = '6';

  var setAlert = function(message) { assets['setAlert'] = message; };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <NewCard setAlert={setAlert} />
    );
  };

  beforeEach(function() {
    FirebaseService.cards.create = jest.genMockFunction();
    App.firebase = jest.genMockFunction().mockReturnValue(adapter);
    App.warden = {
      getLocalStorageUser: function() { return '22'; }
    };
  });

  describe('#handlerError', function() {
    it('calls setAlert', function() {
      subject().handlerError();
      expect(assets.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#handlerSuccess', function() {
    it('transitions to login', function() {
      var localSubject = subject();

      localSubject.context = {
        router: StubRouterContent.stubber({
          transitionTo: function(route, params, query) {
            assets['handlerSuccess'] = {
              route: route
            };
          }
        })
      };

      localSubject.handlerSuccess();

      expect(assets.handlerSuccess).toEqual({ route: '/' })
    });
  });

  describe('#handleSubmit', function() {
    it('calls sendToFirebase with expected arguments', function() {
      var localSubject = subject();

      localSubject.handleSubmit({preventDefault: jest.genMockFn()})

      expect(FirebaseService.cards.create).toBeCalledWith(
        adapter,
        '22',
        {},
        function() {},
        function() {}
      );
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Add');
  });
});
