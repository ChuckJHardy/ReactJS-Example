'use strict';

jest.dontMock('../update');

var Update = require('../update');
var Logger = require('../../../../utilities/logger');

describe('Update', function() {
  var asserts = {
    child: []
  };

  var cardId = 123;

  var mockAdapter = function(error, data) {
    var calls = {
      child: function(key) { asserts.child.push(key); return calls },
      update: function(data, callback) {
        asserts['updateData'] = data;
        callback(error);
      },
    };

    return calls;
  };

  var callbacks = {
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = 'called' },
  };

  var subject = function(error, data) {
    return Update(
      mockAdapter(error, data),
      cardId,
      data,
      callbacks.errorCallback,
      callbacks.successCallback
    );
  };

  describe('Success', function() {
    var data = { 'something' : 'else' };

    beforeEach(function() {
      subject(null, data)
    });

    it('created child node', function() {
      expect(asserts.child[0]).toEqual('cards');
      expect(asserts.child[1]).toEqual(cardId);
    });

    it('passes data', function() {
      expect(asserts.updateData).toEqual(data);
    });

    it('calls callback', function() {
      expect(asserts.successCallback).toEqual('called');
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.notice.cards.updated).toBeCalledWith(cardId);
    });
  });

  describe('Error', function() {
    var error = 'Oops';

    beforeEach(function() {
      subject(error, {})
    });

    it('calls callback with email', function() {
      expect(asserts.errorCallback).toEqual(error);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.cards.updateFail).toBeCalledWith(cardId, error);
    });
  });
});
