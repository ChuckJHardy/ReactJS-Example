'use strict';

var App = require('../components/app');
var Dispatcher = require('../utilities/dispatcher');
var Constants = require('../constants/cards_constants');
var EventEmitter = require('events').EventEmitter;
var Assign = require('react/lib/Object.assign');

var cardsRef = App.firebase('cards');

var _cards = {};

var Store = Assign({}, EventEmitter.prototype, {
  list: function() {
    return _cards;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    cardsRef.off();
    this.removeListener('change', callback);
  }
});

function list() {
  cardsRef.on('child_added', function(snapshot) {
    if (!_cards[snapshot.key()]) {
      _cards[snapshot.key()] = snapshot.val();
    }

    Store.emitChange();
  });
}

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.CARDS_LIST:
      list();
      break;
    default:
  }
});

module.exports = Store;
