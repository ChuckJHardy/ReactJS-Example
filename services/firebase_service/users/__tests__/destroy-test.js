'use strict';

jest.dontMock('../destroy');
jest.dontMock('../../../../utilities/lockdown');

var Destroy = require('../destroy');
var Logger = require('../../../../utilities/logger');

describe('Destroy', function() {
  var asserts = {};
  var email = __LOCKDOWN_KEY__ + '@example.com';
  var password = 'password';

  var mockAdapter = function(error, data) {
    return {
      removeUser: function(params, callback) { callback(error, data); },
    };
  };

  var callbacks = {
    invalidUserCallback: function(email) { asserts['invalidUserCallback'] = email },
    invalidPasswordCallback: function(email) { asserts['invalidPasswordCallback'] = email },
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = data },
  };

  var subject = function(error, data, emailOverride) {
    return Destroy(
      mockAdapter(error, data),
      emailOverride || email,
      password,
      callbacks.invalidUserCallback,
      callbacks.invalidPasswordCallback,
      callbacks.errorCallback,
      callbacks.successCallback
    );
  };

  describe('Success', function() {
    var data = { uid: 123 };

    beforeEach(function() {
      Logger.notice.users.destroyed = jest.genMockFunction();
      subject(null, data)
    });

    it('calls callback with email', function() {
      expect(asserts.successCallback).toEqual(data);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.notice.users.destroyed).toBeCalledWith(email, password, data);
    });
  });

  describe('Invalid User', function() {
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

  describe('Invalid Password', function() {
    var error = { code: 'INVALID_PASSWORD' };

    beforeEach(function() {
      Logger.warn.users.invalidPassword = jest.genMockFunction();
      subject(error);
    });

    it('calls callback with email', function() {
      expect(asserts.invalidPasswordCallback).toEqual(email);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.users.invalidPassword)
        .toBeCalledWith(email, password, error);
    });
  });

  describe('Error', function() {
    var error = 'Oops';

    beforeEach(function() {
      Logger.warn.users.destroyFail = jest.genMockFunction();
      subject(error);
    });

    it('calls callback with email', function() {
      expect(asserts.errorCallback).toEqual(error);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.users.destroyFail)
        .toBeCalledWith(email, password, error);
    });
  });
});
