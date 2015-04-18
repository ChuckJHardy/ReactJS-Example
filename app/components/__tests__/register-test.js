'use strict';

jest.dontMock('../register');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')

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
