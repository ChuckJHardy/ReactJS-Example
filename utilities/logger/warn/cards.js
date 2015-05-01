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

var destroyFail = function(cardId, error, forceRun) {
  Airbrake(error, 'cardsDestroyFail', {
    cardId: cardId
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ Card - Destory Failure');
    console.log('-> Card ID: ', cardId);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

var updateFail = function(cardId, error, forceRun) {
  Airbrake(error, 'cardsUpdateFail', {
    cardId: cardId
  });

  new Runner(forceRun, function() {
    console.groupCollapsed('-> ✗ Card - Update Failure');
    console.log('-> Card ID: ', cardId);
    console.log('-> Error: ', error);
    console.groupEnd();
  });
};

module.exports = {
  createFail: createFail,
  destroyFail: destroyFail,
  updateFail: updateFail,
};
