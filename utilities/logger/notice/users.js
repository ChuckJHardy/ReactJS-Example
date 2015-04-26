'use strict';

var Runner = require('../runner');

var userCreated = function(email, password, data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Created');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

var userDestroyed = function(email, password, data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Destoryed');
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
  created: userCreated,
  destroyed: userDestroyed,
  found: userFound,
  passwordReset: userPasswordReset,
  subscribe: userSubscribe,
};
