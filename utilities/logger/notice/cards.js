'use strict';

var Runner = require('../runner');

var created = function(data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ Card - Created');
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

var destroyed = function(cardId, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ Card - Destroyed');
    console.log('-> Card ID: ', cardId);
    console.groupEnd();
  });
};

var updated = function(cardId, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ Card - Updated');
    console.log('-> Card ID: ', cardId);
    console.groupEnd();
  });
};

module.exports = {
  created: created,
  destroyed: destroyed,
  updated: updated,
};
