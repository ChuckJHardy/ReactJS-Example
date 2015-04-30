'use strict';

jest.dontMock('../cards');
jest.dontMock('../../runner');

var Cards = require('../cards');

describe('Cards', function() {
  var Airbrake = require('../../airbrake');

  var data = {};
  var error = 'Oops';

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();
  });

  describe('#createFail', function() {
    beforeEach(function() {
      Cards.createFail(data, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'cardsCreateFail', { data: data } 
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ Card - Creation Failure');
      expect(console.log.mock.calls[0]).toEqual(['-> Data: ', data]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#destroyFail', function() {
    var cardId = '-JnrJpdjoBsiL-aRq16l';

    beforeEach(function() {
      Cards.destroyFail(cardId, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'cardsDestroyFail', { cardId: cardId } 
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ Card - Destory Failure');
      expect(console.log.mock.calls[0]).toEqual(['-> Card ID: ', cardId]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });
});
