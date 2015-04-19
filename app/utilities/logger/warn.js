'use strict';

var Runner = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
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
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Creation Failure');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userNotFound = function(email, password, error, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Not Found');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userAccessDenied = function(email, password, error, accessKey, forceRun) {
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
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Invalid');
    console.log('-> Email: ', email);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var userPasswordResetFail = function(email, error, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ User - Password Reset Failure');
    console.log('-> Email: ', email);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
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
