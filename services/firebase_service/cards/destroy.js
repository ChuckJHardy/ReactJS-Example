'use strict';

var Logger = require('../../../utilities/logger');

module.exports = function(
  adapter,
  cardId,
  errorCallback,
  successCallback
) {
  adapter.child('cards').child(cardId).remove(function(error) {
    if (error) {
      Logger.warn.cards.destroyFail(cardId, error);
      errorCallback(error);
    } else {
      Logger.notice.cards.destroyed(cardId);
      successCallback();
    }
  });
};
