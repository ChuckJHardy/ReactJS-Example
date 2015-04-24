'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  email,
  invalidUserCallback,
  errorCallback,
  successCallback
) {
  adapter.resetPassword({
    email: email
  }, function(error, data) {
    if (error) {
      switch (error.code) {
        case 'INVALID_USER':
          Logger.warn.users.invalidUser(email, error);
          invalidUserCallback(email); break;
        default:
          Logger.warn.users.passwordResetFail(email, error);
          errorCallback(error);
      }
    } else {
      Logger.notice.users.passwordReset(email);
      successCallback();
    }
  });
};
