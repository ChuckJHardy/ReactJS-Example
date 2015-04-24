'use strict';

jest.dontMock('../find');
jest.dontMock('../../../../utilities/logger');

var Find = require('../find');
var Logger = require('../../../../utilities/logger');

describe('Find', function() {
  var asserts = {};
  var email = __LOCKDOWN_KEY__ + '@example.com';
  var password = 'password';

  var mockAdapter = function(error, data) {
    return {
      authWithPassword: function(params, callback) { callback(error, data); },
    };
  };

  var callbacks = {
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = data }
  };

  var subject = function(error, data) {
    return Find(
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
