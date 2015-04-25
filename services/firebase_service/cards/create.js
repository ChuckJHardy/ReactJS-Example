'use strict';

var Assign = require('react/lib/Object.assign');
var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  userId,
  data,
  errorCallback,
  successCallback
) {
  var adaptedData = Assign({ userId: userId }, data);

  adapter.child('cards').push(adaptedData, function(error) {
    if (error) {
      Logger.warn.cards.createFail(adaptedData, error);
      errorCallback(error);
    } else {
      Logger.notice.cards.created(adaptedData);
      successCallback(adaptedData);
    }
  });
};
