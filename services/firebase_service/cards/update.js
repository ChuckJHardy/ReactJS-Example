'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  cardId,
  errorCallback,
  successCallback
) {
  adapter.child('cards').child(cardId).update(function(error) {
    if (error) {
      Logger.warn.cards.updateFail(cardId, error);
      errorCallback(error);
    } else {
      Logger.notice.cards.updated(cardId);
      successCallback();
    }
  });
};
