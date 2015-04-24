'use strict';

var Logger = require('../../../utilities/logger');
var Lockdown = require('../../../utilities/lockdown');

module.exports = function(
  adapter,
  email,
  password,
  emailTakenCallback,
  invalidEmailCallback,
  errorCallback,
  successCallback,
  lockdownCallback
) {
  if (!Lockdown.opened(email)) {
    var message = 'Still in Alpha so Access Denied.';

    Logger.warn.users.accessDenied(
      email,
      password,
      message,
      __LOCKDOWN_KEY__
    );

    lockdownCallback(message);

    return;
  };

  adapter.createUser({
    email: email,
    password: password
  }, function(error, data) {
    if (error) {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          Logger.warn.users.emailTaken(email, password, error);
          emailTakenCallback(email); break;
        case 'INVALID_EMAIL':
          Logger.warn.users.invalidEmail(email, password, error);
          invalidEmailCallback(email); break;
        default:
          Logger.warn.users.createFail(email, password, error);
          errorCallback(error);
      }
    } else {
      Logger.notice.users.created(email, password, data);
      successCallback(data);
    }
  });
};

