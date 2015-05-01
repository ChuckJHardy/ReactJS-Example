'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  cardId,
  data,
  errorCallback,
  successCallback
) {
  adapter.child('cards').child(cardId).update(data, function(error) {
    if (error) {
      Logger.warn.cards.updateFail(cardId, error);
      errorCallback(error);
    } else {
      Logger.notice.cards.updated(cardId);
      successCallback();
    }
  });
};
