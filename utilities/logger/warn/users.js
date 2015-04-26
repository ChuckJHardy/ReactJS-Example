'use strict';

var Airbrake = require('../airbrake');
var Runner = require('../runner');

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

var userDestoryFail = function(email, password, error, forceRun) {
  Airbrake(error, 'userDestoryFail', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Destory Failure');
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

var userInvalidPassword = function(email, password, error, forceRun) {
  Airbrake(error, 'userInvalidPassword', {
    email: email,
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Invalid Password');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
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

var userSubscribe = function(email, listId, error, forceRun) {
  Airbrake(error, 'userSubscribe', {
    email: email,
    listId: listId
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Subscription Failure');
    console.log('-> Email: ', email);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
  createFail: userCreateFail,
  destroyFail: userDestoryFail,
  emailTaken: userEmailTaken,
  invalidEmail: userInvalidEmail,
  notFound: userNotFound,
  accessDenied: userAccessDenied,
  invalidUser: userInvalid,
  invalidPassword: userInvalidPassword,
  passwordResetFail: userPasswordResetFail,
  subscribe: userSubscribe,
};
