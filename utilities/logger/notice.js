'use strict';

var Runner = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
};

var userCreated = function(email, password, data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Created');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

var userFound = function(email, password, data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Found');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

var userPasswordReset = function(email, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Password Reset');
    console.log('-> Email: ', email);
    console.groupEnd();
  });
};

var userSubscribe = function(email, data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Subscribed');
    console.log('-> Email: ', email);
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

module.exports = {
  users: {
    created: userCreated,
    found: userFound,
    passwordReset: userPasswordReset,
    subscribe: userSubscribe,
  }
};
