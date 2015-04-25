'use strict';

var Airbrake = require('../airbrake');
var Runner = require('../runner');

var createFail = function(data, error, forceRun) {
  Airbrake(error, 'cardsCreateFail', {
    data: data
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ Card - Creation Failure');
    console.log('-> Data: ', data);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};


module.exports = {
  createFail: createFail,
};
