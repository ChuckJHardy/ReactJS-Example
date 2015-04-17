'use strict';

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
          emailTakenCallback(email); break;
        case 'INVALID_EMAIL':
          invalidEmailCallback(email); break;
        default:
          errorCallback(error);
      }
    } else {
      successCallback(data);
    }
  });
};

module.exports = {
  create: create
};
