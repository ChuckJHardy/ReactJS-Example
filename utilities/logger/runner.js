'use strict';

module.exports = function(forceRun, block) {
  if (forceRun || __DEV__) { block(); }
};
