'use strict';

jest.dontMock('../reset_password');
jest.dontMock('../../../../utilities/logger');

var ResetPassword = require('../reset_password');
var Logger = require('../../../../utilities/logger');

describe('ResetPassword', function() {
  var asserts = {};
  var email = __LOCKDOWN_KEY__ + '@example.com';
  var password = 'password';

  var mockAdapter = function(error, data) {
    return {
      resetPassword: function(params, callback) { callback(error, data); }
    };
  };

  var callbacks = {
    invalidUserCallback: function(error) { asserts['invalidUserCallback'] = error },
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = data }
  };

  var subject = function(error, data) {
    return ResetPassword(
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
