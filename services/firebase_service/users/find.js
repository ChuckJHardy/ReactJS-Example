'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  email,
  password,
  errorCallback,
  successCallback
) {
  adapter.authWithPassword({
    email: email,
    password: password
  }, function(error, data) {
    if (error) {
      Logger.warn.users.notFound(email, password, error);
      errorCallback(error);
    } else {
      Logger.notice.users.found(email, password, data);
      successCallback(data);
    }
  });
};
