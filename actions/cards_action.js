'use strict';

var Dispatcher = require('../utilities/dispatcher');
var Constants = require('../constants/cards_constants');

module.exports = {
  list: function() {
    Dispatcher.dispatch({
      actionType: Constants.CARDS_LIST
    });
  },
};
