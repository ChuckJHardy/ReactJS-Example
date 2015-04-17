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
        expect(Logger.notice.users.created).toBeCalledWith(email, password);
      });
    });

    describe('Email Taken', function() {
      var error = { code: 'EMAIL_TAKEN' };

      beforeEach(function() {
        Logger.warn.users.emailTaken = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.emailTakenCallback).toEqual(email);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.emailTaken)
          .toBeCalledWith(email, password, error);
      });
    });

    describe('Invalid Email', function() {
      var error = { code: 'INVALID_EMAIL' };

      beforeEach(function() {
        Logger.warn.users.invalidEmail = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.invalidEmailCallback).toEqual(email);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.invalidEmail)
          .toBeCalledWith(email, password, error);
      });
    });

    describe('Error', function() {
      var error = 'Oops';

      beforeEach(function() {
        Logger.warn.users.createFail = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.errorCallback).toEqual(error);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.createFail)
          .toBeCalledWith(email, password, error);
      });
    });
  });
});
