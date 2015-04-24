'use strict';

jest.dontMock('../create');
jest.dontMock('../../../../utilities/lockdown');

var Create = require('../create');
var Logger = require('../../../../utilities/logger');

describe('Create', function() {
  var asserts = {};
  var email = __LOCKDOWN_KEY__ + '@example.com';
  var password = 'password';

  var mockAdapter = function(error, data) {
    return {
      createUser: function(params, callback) { callback(error, data); },
    };
  };

  var callbacks = {
    emailTakenCallback: function(email) { asserts['emailTakenCallback'] = email },
    invalidEmailCallback: function(email) { asserts['invalidEmailCallback'] = email },
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = data },
    lockdownCallback: function(error) { asserts['lockdownCallback'] = error }
  };

  var subject = function(error, data, emailOverride) {
    return Create(
      mockAdapter(error, data),
      emailOverride || email,
      password,
      callbacks.emailTakenCallback,
      callbacks.invalidEmailCallback,
      callbacks.errorCallback,
      callbacks.successCallback,
      callbacks.lockdownCallback
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
    var error = 'Still in Alpha so Access Denied.';
    var localEmail = 'test@example.com';

    beforeEach(function() {
      Logger.warn.users.accessDenied = jest.genMockFunction();
      subject(error, null, localEmail);
    });

    it('calls callback with email', function() {
      expect(asserts.lockdownCallback).toEqual(error);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.users.accessDenied)
        .toBeCalledWith(localEmail, password, error, __LOCKDOWN_KEY__);
    });
  });
});
