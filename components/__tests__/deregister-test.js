'use strict';

jest.dontMock('../deregister');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('Deregister', function() {
  var Deregister = require('../deregister');

  var assets = {};
  var setAlert = function(message) { assets['setAlert'] = message; };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Deregister setAlert={setAlert} />
    );
  };

  beforeEach(function() {
    FirebaseService.users.destroy = jest.genMockFunction();
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

      expect(FirebaseService.users.destroy).toBeCalledWith(
        adapter,
        email,
        password,
        function() {},
        function() {},
        function() {},
        function() {}
      );
    });
  });

  describe('#handlerInvalidUser', function() {
    it('calls setAlert', function() {
      subject().handlerInvalidUser();
      expect(assets.setAlert).toEqual('Nope, its confirmed, you dont exist');
    });
  });

  describe('#handlerInvalidPassword', function() {
    it('updates state', function() {
      var localSubject = subject();
      expect(localSubject.state.invalidPassword).toEqual(false);
      localSubject.handlerInvalidPassword();
      expect(localSubject.state.invalidPassword).toEqual(true);
    });
  });

  describe('#handlerError', function() {
    it('calls setAlert', function() {
      subject().handlerError();
      expect(assets.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#handlerSuccess', function() {
    var data = { uid: 123 };

    beforeEach(function() {
      App.warden = {
        logout: function() { assets['warden'] = 'success'; }
      };
    });

    it('calls off to warden for login and transitions to login', function() {
      var localSubject = subject();

      localSubject.context = {
        router: StubRouterContent.stubber({
          replaceWith: function(route) { assets['handlerSuccess'] = route; }
        })
      }

      localSubject.handlerSuccess(data);

      expect(assets.handlerSuccess).toEqual('/bye');
      expect(assets.warden).toEqual('success');
    });
  });

  describe('Errors', function() {
    describe('When Invalid Password', function() {
      it('includes expected copy', function() {
        var localSubject = subject();

        expect(localSubject.getDOMNode().innerHTML)
          .not.toContain('form-field-error');

        localSubject.setState({invalidPassword: true});

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('Incorrect Password');

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('form-field form-field-error');
      });
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Delete Account');
  });
});
