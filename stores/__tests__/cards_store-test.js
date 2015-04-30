'use strict';

jest.autoMockOff();
jest.mock('../../components/app');

var asserts = {
  onName: []
};

var snapshot = {
  key: function() { return 'key'; },
  val: function() { return { 'something' : 'else' }; }
};

jest.setMock('../../components/app', {
  firebase: function(endpoint) {
    asserts['endpoint'] = endpoint;

    var reference = {
      child: function(name) {
        asserts['childName'] = name;
        return reference;
      },
      once: function(name, callback) {
        asserts['onceName'] = name;
        callback(snapshot);
      },
      on: function(name, callback) {
        asserts['onName'].push(name);
        callback(snapshot);
      },
    };

    return reference;
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
  });

  it('sets firebase endpoint', function() {
    expect(asserts.endpoint).toEqual('cards');
  });

  describe('#find', function() {
    var id = '-JnrJpdjoBsiL-aRq16l';

    beforeEach(function() {
      CardsAction.find(id);
    });

    it('calls firebase child node with expected name', function() {
      expect(asserts.childName).toEqual(id);
    });

    it('calls firebase on with expected name', function() {
      expect(asserts.onceName).toEqual('value');
    });

    it('returns card', function() {
      expect(CardsStore.card()).toEqual({ 'something' : 'else' });
    });
  });

  describe('#list', function() {
    beforeEach(function() {
      CardsAction.list();
    });

    it('calls firebase on with expected name', function() {
      expect(asserts.onName[0]).toEqual('child_added');
      expect(asserts.onName[1]).toEqual('child_removed');
    });

    it('returns list', function() {
      expect(CardsStore.list()).toEqual({});
    });
  });
});
