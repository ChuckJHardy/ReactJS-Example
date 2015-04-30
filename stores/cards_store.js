'use strict';

var App = require('../components/app');
var Dispatcher = require('../utilities/dispatcher');
var Constants = require('../constants/cards_constants');
var EventEmitter = require('events').EventEmitter;
var Assign = require('react/lib/Object.assign');

var cardsRef = App.firebase('cards');

var _card = {};
var _cards = {};

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

var Store = Assign({}, EventEmitter.prototype, {
  card: function() {
    return _card;
  },
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

function find(id) {
  cardsRef.child(id).once('value', function(snapshot) {
    if (isEmpty(_card)) {
      _card = snapshot.val();
    }

    Store.emitChange();
  });
}

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
    case Constants.CARDS_FIND:
      find(action.id);
      break;
    case Constants.CARDS_LIST:
      list();
      break;
    default:
  }
});

module.exports = Store;
