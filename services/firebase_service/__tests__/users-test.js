'use strict';

jest.dontMock('../users');
jest.dontMock('../../../utilities/lockdown');

var Users = require('../users');
var Logger = require('../../../utilities/logger');

describe('FirebaseService/Users', function() {
  var email = __LOCKDOWN_KEY__ + '@example.com';
  var password = 'password';

  var mockAdapter = function(error, data) {
    return {
      authWithPassword: function(params, callback) { callback(error, data); },
      createUser: function(params, callback) { callback(error, data); },
      resetPassword: function(params, callback) { callback(error, data); }
    };
  };

  describe('#create', function() {
    var asserts = {};
    var callbacks = {
      emailTakenCallback: function(email) { asserts['emailTakenCallback'] = email },
      invalidEmailCallback: function(email) { asserts['invalidEmailCallback'] = email },
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data }
    };

    var subject = function(error, data, emailOverride) {
      return Users.create(
        mockAdapter(error, data),
        emailOverride || email,
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
        expect(Logger.notice.users.created).toBeCalledWith(email, password, data);
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

    describe('Access Denied', function() {
      var error = 'Access Denied';
      var localEmail = 'test@example.com';

      beforeEach(function() {
        Logger.warn.users.accessDenied = jest.genMockFunction();
        subject(error, null, localEmail);
      });

      it('calls callback with email', function() {
        expect(asserts.errorCallback).toEqual(error);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.accessDenied)
          .toBeCalledWith(localEmail, password, error, __LOCKDOWN_KEY__);
      });
    });
  });

  describe('#find', function() {
    var asserts = {};
    var callbacks = {
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data }
    };

    var subject = function(error, data) {
      return Users.find(
        mockAdapter(error, data),
        email,
        password,
        callbacks.errorCallback,
        callbacks.successCallback
      );
    };

    describe('Success', function() {
      var data = { uid: 123 };

      beforeEach(function() {
        Logger.notice.users.found = jest.genMockFunction();
        subject(null, data)
      });

      it('calls callback with email', function() {
        expect(asserts.successCallback).toEqual(data);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.notice.users.found).toBeCalledWith(email, password, data);
      });
    });

    describe('Error', function() {
      var error = 'Oops';

      beforeEach(function() {
        Logger.warn.users.notFound = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.errorCallback).toEqual(error);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.notFound)
          .toBeCalledWith(email, password, error);
      });
    });
  });

  describe('#resetPassword', function() {
    var asserts = {};
    var callbacks = {
      invalidUserCallback: function(error) { asserts['invalidUserCallback'] = error },
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data }
    };

    var subject = function(error, data) {
      return Users.resetPassword(
        mockAdapter(error, data),
        email,
        callbacks.invalidUserCallback,
        callbacks.errorCallback,
        callbacks.successCallback
      );
    };

    describe('Success', function() {
      var data = { uid: 123 };

      beforeEach(function() {
        Logger.notice.users.passwordReset = jest.genMockFunction();
        subject(null, data)
      });

      it('calls callback with email', function() {
        expect(asserts.successCallback).toEqual(null);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.notice.users.passwordReset).toBeCalledWith(email);
      });
    });

    describe('Invalid Email', function() {
      var error = { code: 'INVALID_USER' };

      beforeEach(function() {
        Logger.warn.users.invalidUser = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.invalidUserCallback).toEqual(email);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.invalidUser)
          .toBeCalledWith(email, error);
      });
    });

    describe('Error', function() {
      var error = 'Oops';

      beforeEach(function() {
        Logger.warn.users.passwordResetFail = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.errorCallback).toEqual(error);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.passwordResetFail)
          .toBeCalledWith(email, error);
      });
    });
  });
});
