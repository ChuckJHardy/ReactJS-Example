'use strict';

jest.dontMock('../cards');
jest.dontMock('../../runner');

var Cards = require('../cards');

describe('Cards', function() {
  var error = 'Oops';
  var data = {
    uid: 123
  };

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();
  });

  describe('#created', function() {
    beforeEach(function() {
      Cards.created(data, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ Card - Created');
      expect(console.log.mock.calls[0]).toEqual(['-> Data: ', data]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#destroyed', function() {
    var cardId = '-JnrJpdjoBsiL-aRq16l';

    beforeEach(function() {
      Cards.destroyed(cardId, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ Card - Destroyed');
      expect(console.log.mock.calls[0]).toEqual(['-> Card ID: ', cardId]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#updated', function() {
    var cardId = '-JnrJpdjoBsiL-aRq16l';

    beforeEach(function() {
      Cards.updated(cardId, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ Card - Updated');
      expect(console.log.mock.calls[0]).toEqual(['-> Card ID: ', cardId]);
      expect(console.groupEnd).toBeCalled();
    });
  });
});
