'use strict';

jest.dontMock('../mailchimp_service');

var MailchimpService = require('../mailchimp_service');
var Logger = require('../../utilities/logger');

describe('MailchimpService', function() {
  var email = 'test@example.com';
  var listId = __MAILCHIMP_LIST_ID__;

  var mockAdapter = function(error, data) {
    return {
      listSubscribe: function(params, callback) { callback(error, data); },
    };
  };

  describe('#subscribe', function() {
    var asserts = {};
    var callbacks = {
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data },
    };

    var subject = function(error, data) {
      return MailchimpService.subscribe(
        mockAdapter(error, data),
        listId,
        email,
        callbacks.errorCallback,
        callbacks.successCallback
      );
    };

    describe('Success', function() {
      var data = { uid: 123 };

      beforeEach(function() {
        Logger.notice.users.subscribe = jest.genMockFunction();
        subject(null, data)
      });

      it('calls callback with email', function() {
        expect(asserts.successCallback).toEqual(null);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.notice.users.subscribe).toBeCalledWith(email, listId);
      });
    });

    describe('Error', function() {
      var error = 'Oops';

      beforeEach(function() {
        Logger.warn.users.subscribe = jest.genMockFunction();
        subject(error);
      });

      it('calls callback with email', function() {
        expect(asserts.errorCallback).toEqual(error);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.warn.users.subscribe)
          .toBeCalledWith(email, listId, error);
      });
    });
  });
});
