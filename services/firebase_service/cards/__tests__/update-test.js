'use strict';

jest.dontMock('../update');

var Update = require('../update');
var Logger = require('../../../../utilities/logger');

describe('Update', function() {
  var asserts = {
    child: [] 
  };

  var cardId = 123;

  var mockAdapter = function(error) {
    var calls = {
      child: function(key) { asserts.child.push(key); return calls },
      update: function(callback) { callback(error); },
    };

    return calls;
  };

  var callbacks = {
    errorCallback: function(error) { asserts['errorCallback'] = error },
    successCallback: function(data) { asserts['successCallback'] = 'called' },
  };

  var subject = function(error) {
    return Update(
      mockAdapter(error),
      cardId,
      callbacks.errorCallback,
      callbacks.successCallback
    );
  };

  describe('Success', function() {
    beforeEach(function() {
      subject(null)
    });

    it('created child node', function() {
      expect(asserts.child[0]).toEqual('cards');
      expect(asserts.child[1]).toEqual(cardId);
    });

    it('calls callback with email', function() {
      expect(asserts.successCallback).toEqual('called');
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.notice.cards.updated).toBeCalledWith(cardId);
    });
  });

  describe('Error', function() {
    var error = 'Oops';

    beforeEach(function() {
      subject(error)
    });

    it('calls callback with email', function() {
      expect(asserts.errorCallback).toEqual(error);
    });

    it('calls off to logger with correct args', function() {
      expect(Logger.warn.cards.updateFail).toBeCalledWith(cardId, error);
    });
  });
});
