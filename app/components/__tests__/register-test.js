'use strict';

jest.dontMock('../register');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var StubRouterContent = require('../../support/stub_router_context');

var App = require('../../components/app');
var FirebaseService = require('../../services/firebase_service');

describe('Register', function() {
  var Register = require('../register');

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Register />
    );
  };

  beforeEach(function() {
    FirebaseService.users.create = jest.genMockFunction();
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

      expect(FirebaseService.users.create).toBeCalledWith(
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

  describe('#handlerEmailTaken', function() {
    it('updates state', function() {
      var localSubject = subject();
      expect(localSubject.state.emailTaken).toEqual(false);
      localSubject.handlerEmailTaken();
      expect(localSubject.state.emailTaken).toEqual(true);
    });
  });

  describe('#handlerInvalidEmail', function() {
    it('updates state', function() {
      var localSubject = subject();
      expect(localSubject.state.invalidEmail).toEqual(false);
      localSubject.handlerInvalidEmail();
      expect(localSubject.state.invalidEmail).toEqual(true);
    });
  });

  describe('#handlerSuccess', function() {
    var assets = {};
    var data = { uid: 123 };

    beforeEach(function() {
      App.warden = {
        login: function(uid) { assets['warden'] = uid; }
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

      expect(assets.handlerSuccess).toEqual('dashboard');
      expect(assets.warden).toEqual(data.uid);
    });
  });

  describe('Errors', function() {
    describe('When Email Taken', function() {
      it('includes expected copy', function() {
        var localSubject = subject();

        expect(localSubject.getDOMNode().innerHTML)
          .not.toContain('form-field-error');

        localSubject.setState({emailTaken: true});

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('Email Taken');

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('form-field form-field-error');
      });
    });

    describe('When Invalid Email', function() {
      it('includes expected copy', function() {
        var localSubject = subject();

        expect(localSubject.getDOMNode().innerHTML)
          .not.toContain('form-field-error');

        localSubject.setState({invalidEmail: true});

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('Invalid Email Address');

        expect(localSubject.getDOMNode().innerHTML)
          .toContain('form-field form-field-error');
      });
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Email');
  });
});
