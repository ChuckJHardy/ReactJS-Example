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

module.exports = {
  users: {
    emailTaken: userEmailTaken,
    invalidEmail: userInvalidEmail,
    createFail: userCreateFail
  }
};
