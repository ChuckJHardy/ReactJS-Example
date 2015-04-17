'use strict';

jest.dontMock('../users');

var Users = require('../users');
var Logger = require('../../../utilities/logger');

describe('FirebaseService/Users', function() {
  describe('#create', function() {
    var asserts = {};
    var callbacks = {
      emailTakenCallback: function(email) { asserts['emailTakenCallback'] = email },
      invalidEmailCallback: function(email) { asserts['invalidEmailCallback'] = email },
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data }
    };

    var email = 'test@example.com';
    var password = 'password';

    var subject = function(error, data) {
      var mockAdapter = {
        createUser: function(params, callback) { callback(error, data); }
      };

      return Users.create(
        mockAdapter,
        email,
        password,
        callbacks.emailTakenCallback,
        callbacks.invalidEmailCallback,
        callbacks.errorCallback,
        callbacks.successCallback
      );
    };

    describe('Success', function() {
      var data = { uid: 123 };

      beforeEach(function() {
        Logger.notice.users.created = jest.genMockFunction();
        subject(null, data)
      });

      it('calls callback with email', function() {
        expect(asserts.successCallback).toEqual(data);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.notice.users.created).toBeCalledWith(email, password, null);
      });
    });

    describe('Email Taken', function() {
      it('calls callback with email', function() {
        subject({ code: 'EMAIL_TAKEN' });
        expect(asserts.emailTakenCallback).toEqual(email);
      });
    });

    describe('Invalid Email', function() {
      it('calls callback with email', function() {
        subject({ code: 'INVALID_EMAIL' });
        expect(asserts.invalidEmailCallback).toEqual(email);
      });
    });

    describe('Error', function() {
      it('calls callback with email', function() {
        var error = 'Oops';
        subject(error);
        expect(asserts.errorCallback).toEqual(error);
      });
    });
  });
});
