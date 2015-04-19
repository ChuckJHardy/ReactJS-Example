'use strict';

jest.dontMock('../login');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('Login', function() {
  var Login = require('../login');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Login />
    );
  };

  beforeEach(function() {
    FirebaseService.users.create = jest.genMockFunction();
  });

  describe('#handlePasswordReset', function() {
    var assets = {};

    it('transitions to password reset', function() {
      var localSubject = subject();

      localSubject.context = {
        router: StubRouterContent.stubber({
          transitionTo: function(route) { assets['handlePasswordReset'] = route; } 
        })
      }

      localSubject.handlePasswordReset();
      expect(assets.handlePasswordReset).toEqual('password_reset')
    });
  });

  describe('#handleSubmit', function() {
    var adapter = jest.genMockFn();
    var email = 'test@example.com';
    var password = 'password';

    it('calls sendToFirebase with expected arguments', function() {
      App.firebase = jest.genMockFunction().mockReturnValue(adapter);

      var localSubject = subject();

      localSubject.refs.email.getDOMNode().value = email;
      localSubject.refs.password.getDOMNode().value = password;

      localSubject.handleSubmit({preventDefault: jest.genMockFn()})

      expect(FirebaseService.users.find).toBeCalledWith(
        adapter,
        email,
        password,
        function() {},
        function() {}
      );
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Email');
  });
});
