'use strict';

jest.dontMock('../mailchimp_service');

var MailchimpService = require('../mailchimp_service');
var MailchimpDAO = require('../../dao/mailchimp_dao');
var Logger = require('../../utilities/logger');

describe('MailchimpService', function() {
  var adapter = jest.genMockFunction();
  var email = 'test@example.com';

  describe('#subscribe', function() {
    var asserts = {};
    var callbacks = {
      errorCallback: function(error) { asserts['errorCallback'] = error },
      successCallback: function(data) { asserts['successCallback'] = data },
    };

    var subject = function(error, data) {
      var mockDAO = {
        end: function(callback) { callback(error, data); },
      };

      MailchimpDAO.subscribe = jest.genMockFunction().mockReturnValue(mockDAO);

      return MailchimpService.subscribe(
        adapter,
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
        expect(asserts.successCallback).toEqual(data);
      });

      it('calls off to logger with correct args', function() {
        expect(Logger.notice.users.subscribe).toBeCalledWith(email, data);
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
          .toBeCalledWith(email, error);
      });
    });
  });
});
