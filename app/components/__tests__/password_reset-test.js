'use strict';

jest.dontMock('../password_reset');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('PasswordReset', function() {
  var PasswordReset = require('../password_reset');

  var email = 'test@example.com';

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <PasswordReset />
    );
  };

  beforeEach(function() {
    FirebaseService.users.resetPassword = jest.genMockFunction();
  });

  describe('#populateFormValuesFromQuery', function() {
    describe('When Email Passed', function() {
      it('sets the email input to the email address', function() {
        var localSubject = subject();

        localSubject.context = {
          router: StubRouterContent.stubber({
            getCurrentQuery: function() { return { email: email } }
          })
        }

        localSubject.populateFormValuesFromQuery();
        expect(localSubject.refs.email.getDOMNode().value).toEqual(email)
      });
    });

    describe('When No Email was Passed', function() {
      it('does not change the email input value', function() {
        var localSubject = subject();
        var currentEmailInputValue = localSubject.refs.email.getDOMNode().value;
        localSubject.populateFormValuesFromQuery();
        expect(localSubject.refs.email.getDOMNode().value).toEqual(currentEmailInputValue)
      });
    });
  });

  describe('#handleSubmit', function() {
    var adapter = jest.genMockFn();

    it('calls sendToFirebase with expected arguments', function() {
      App.firebase = jest.genMockFunction().mockReturnValue(adapter);

      var localSubject = subject();

      localSubject.refs.email.getDOMNode().value = email;

      localSubject.handleSubmit({preventDefault: jest.genMockFn()})

      expect(FirebaseService.users.resetPassword).toBeCalledWith(
        adapter,
        email,
        function() {},
        function() {},
        function() {}
      );
    });
  });

  describe('#handlerSuccess', function() {
    var assets = {};

    it('transitions to login', function() {
      var localSubject = subject();

      localSubject.context = {
        router: StubRouterContent.stubber({
          transitionTo: function(route) { assets['handlerSuccess'] = route; }
        })
      }

      localSubject.handlerSuccess();
      expect(assets.handlerSuccess).toEqual('login')
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Reset');
  });
});
