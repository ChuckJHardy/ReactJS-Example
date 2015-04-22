'use strict';

var MailchimpDAO = require('../dao/mailchimp_dao');
var Logger = require('../utilities/logger');

var subscribe = function(
  adapter,
  email,
  errorCallback,
  successCallback
) {
  MailchimpDAO.subscribe(adapter, email).end(function(error, data) {
    if (error) {
      Logger.warn.users.subscribe(email, error);
      errorCallback(error);
    } else {
      Logger.notice.users.subscribe(email, data);
      successCallback(data);
    }
  });
};

module.exports = {
  subscribe: subscribe,
};
