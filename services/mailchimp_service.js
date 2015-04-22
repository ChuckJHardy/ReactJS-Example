'use strict';

var Logger = require('../utilities/logger');

var subscribe = function(
  adapter,
  listId,
  email,
  errorCallback,
  successCallback
) {
  adapter.listSubscribe({
    id: listId,
    email_address: email,
    double_optin: false
  }, function(error, data) {
    if (error) {
      Logger.warn.users.subscribe(email, listId, error);
      errorCallback(error);
    } else {
      Logger.notice.users.subscribe(email, listId);
      successCallback();
    }
  });
};

module.exports = {
  subscribe: subscribe,
};
