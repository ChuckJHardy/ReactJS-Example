'use strict';

var Runner = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
};

var userCreated = function(email, password, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ User - Created');
    console.log('-> Email: ', email);
    console.log('-> Password: ', password);
    console.groupEnd();
  });
};

module.exports = {
  users: {
    created: userCreated
  }
};
