'use strict';

var Logger = require('../../utilities/logger');
var Lockdown = require('../../utilities/lockdown');

var create = function(
  adapter,
  email,
  password,
  emailTakenCallback,
  invalidEmailCallback,
  errorCallback,
  successCallback
) {
  if (!Lockdown.opened(email)) {
    Logger.warn.users.accessDenied(
      email,
      password,
      'Access Denied',
      __LOCKDOWN_KEY__
    );

    errorCallback('Access Denied');
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

var find = function(
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

module.exports = {
  create: create,
  find: find
};
