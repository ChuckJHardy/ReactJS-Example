'use strict';

jest.dontMock('../create');

var Create = require('../create');
var Logger = require('../../../../utilities/logger');

describe('Create', function() {
  var asserts = {};
  var userId = 123;

  var mockAdapter = function(error, data) {
    var calls = {
      child: function(key) { asserts['child'] = key; return calls },
      push: function(data, callback) { callback(error, data); },
    };

    return calls;
  };

  var callbacks = {
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = data },
  };

  var subject = function(error, data) {
    return Create(
      mockAdapter(error, data),
      userId,
      data,
      callbacks.errorCallback,
      callbacks.successCallback
    );
  };

  describe('Success', function() {
    var data = { something: 1 };

    var expectedData = {
      userId: userId, 
      something: 1,
    };

    beforeEach(function() {
      subject(null, data)
    });

    it('created child node', function() {
      expect(asserts.child).toEqual('cards');
    });

    it('calls callback with email', function() {
      expect(asserts.successCallback).toEqual(expectedData);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.notice.cards.created).toBeCalledWith(expectedData);
    });
  });

  describe('Error', function() {
    var error = 'Oops';
    var expectedData = {
      userId: userId
    };

    beforeEach(function() {
      subject(error, {})
    });

    it('created child node', function() {
      expect(asserts.child).toEqual('cards');
    });

    it('calls callback with email', function() {
      expect(asserts.errorCallback).toEqual(error);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.cards.createFail).toBeCalledWith(expectedData, error);
    });
  });
});
