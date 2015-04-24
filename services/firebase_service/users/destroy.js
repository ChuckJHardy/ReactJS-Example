'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  email,
  password,
  invalidUserCallback,
  invalidPasswordCallback,
  errorCallback,
  successCallback
) {
  adapter.removeUser({
    email: email,
    password: password
  }, function(error, data) {
    if (error) {
      switch (error.code) {
        case 'INVALID_USER':
          Logger.warn.users.invalidUser(email, error);
          invalidUserCallback(email); break;
        case 'INVALID_PASSWORD':
          Logger.warn.users.invalidPassword(email, password, error);
          invalidPasswordCallback(email); break;
        default:
          Logger.warn.users.destroyFail(email, password, error);
          errorCallback(error);
      }
    } else {
      Logger.notice.users.destroyed(email, password, data);
      successCallback(data);
    }
  });
};
