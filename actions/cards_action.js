'use strict';

var Dispatcher = require('../utilities/dispatcher');
var Constants = require('../constants/cards_constants');

module.exports = {
  find: function(id) {
    Dispatcher.dispatch({
      actionType: Constants.CARDS_FIND,
      id: id
    });
  },
  list: function(userId) {
    Dispatcher.dispatch({
      actionType: Constants.CARDS_LIST,
      userId: userId
    });
  },
};
