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

    var subject = function(data, error) {
      var mockDAO = {
        then: function(callback) { callback(data); return mockDAO; },
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
      var error = 'Oops';
      var data = {
        result: 'success',
        msg: error
      };

      beforeEach(function() {
        Logger.notice.users.subscribe = jest.genMockFunction();
        subject(data)
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
      var data = {
        result: 'error',
        msg: error
      };

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
