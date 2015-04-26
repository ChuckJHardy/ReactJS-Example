'use strict';

var Airbrake = require('./airbrake');
var Runner = require('./runner');

var Cards = require('./warn/cards');
var Users = require('./warn/users');

var general = function(name, error, params, forceRun) {
  Airbrake(error, name, params);

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ General - ' + name);
    console.log('-> Params: ', params);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
  cards: Cards,
  general: general,
  users: Users,
};
