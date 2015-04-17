'use strict';

var Logger = require('../../utilities/logger');

var create = function(
  adapter,
  email,
  password,
  emailTakenCallback,
  invalidEmailCallback,
  errorCallback,
  successCallback
) {
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
          invalidEmailCallback(email); break;
        default:
          errorCallback(error);
      }
    } else {
      Logger.notice.users.created(email, password);
      successCallback(data);
    }
  });
};

module.exports = {
  create: create
};
