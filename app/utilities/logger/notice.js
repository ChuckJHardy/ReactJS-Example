'use strict';

var Runner = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
};

var userCreated = function(email, password, error, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> User Created');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
  users: {
    created: userCreated
  }
};
