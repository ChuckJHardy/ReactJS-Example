'use strict';

var Runner = require('../runner');

var created = function(data, forceRun) {
  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✓ Card - Created');
    console.log('-> Data: ', data);
    console.groupEnd();
  });
};

module.exports = {
  created: created,
};
