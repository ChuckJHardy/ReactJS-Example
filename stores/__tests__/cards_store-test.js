'use strict';

jest.autoMockOff();
jest.mock('../../components/app');

var asserts = {};
var snapshot = {
  key: function() { return 'key'; },
  val: function() { return 'value'; }
};

jest.setMock('../../components/app', {
  firebase: function(endpoint) {
    asserts['endpoint'] = endpoint;

    return {
      on: function(name, callback) {
        asserts['onName'] = name;
        callback(snapshot);
      },
      off: function() {
        asserts['firebaseOff'] = 'called';
      }
    }
  }
}) 

describe('CardsStore', function() {
  var CardsAction = require('../../actions/cards_action');
  var CardsStore = require('../cards_store');

  var called = false;
  var changeListener = function() {
    called = true; 
  };

  beforeEach(function() {
    CardsStore.addChangeListener(changeListener) ;
    CardsAction.list();
  });

  it('sets firebase endpoint', function() {
    expect(asserts.endpoint).toEqual('cards');
  });

  it('remove firebase watch on removeChangeListener', function() {
    CardsStore.removeChangeListener(changeListener) ;
    expect(asserts.firebaseOff).toEqual('called');
  });

  describe('#list', function() {
    it('calls firebase on with expected name', function() {
      expect(asserts.onName).toEqual('child_added');
    });

    it('returns list', function() {
      expect(CardsStore.list()).toEqual({ 'key': 'value' });
    });
  });
});
