'use strict';

var Runner = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
};

var Airbrake = function(error, component, params) {
  window.airbrake.push({
    error: error,
    context: { component: component },
    environment: { navigator_vendor: window.navigator.vendor },
    params: params
  });
};

var general = function(name, error, params, forceRun) {
  Airbrake(error, name, params);

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ General - ' + name);
    console.log('-> Params: ', params);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userEmailTaken = function(email, password, error, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Email Taken');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userInvalidEmail = function(email, password, error, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Invalid Email');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userCreateFail = function(email, password, error, forceRun) {
  Airbrake(error, 'userCreateFail', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Creation Failure');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userNotFound = function(email, password, error, forceRun) {
  Airbrake(error, 'userNotFound', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Not Found');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userAccessDenied = function(email, password, error, accessKey, forceRun) {
  Airbrake(error, 'userAccessDenied', {
    email: email,
    accessKey: accessKey,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Access Denied');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Access Key: ', accessKey);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userInvalid = function(email, error, forceRun) {
  Airbrake(error, 'userInvalid', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Invalid');
    console.log('-> Email: ', email);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userPasswordResetFail = function(email, error, forceRun) {
  Airbrake(error, 'userPasswordResetFail', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Password Reset Failure');
    console.log('-> Email: ', email);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
  general: general,
  users: {
    createFail: userCreateFail,
    emailTaken: userEmailTaken,
    invalidEmail: userInvalidEmail,
    notFound: userNotFound,
    accessDenied: userAccessDenied,
    invalidUser: userInvalid,
    passwordResetFail: userPasswordResetFail,
  }
};
