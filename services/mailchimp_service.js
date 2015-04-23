'use strict';

var MailchimpDAO = require('../dao/mailchimp_dao');
var Logger = require('../utilities/logger');

var subscribe = function(
  adapter,
  email,
  errorCallback,
  successCallback
) {
  MailchimpDAO.subscribe(adapter, email)
    .then(function(data) {
      if (data.result === 'success') {
        Logger.notice.users.subscribe(email, data);
        successCallback(data);
      } else {
        Logger.warn.users.subscribe(email, data);
        errorCallback(data);
      }
    });
};

module.exports = {
  subscribe: subscribe,
};
