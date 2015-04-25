'use strict';

jest.dontMock('../warn');
jest.dontMock('../runner');

var Warn = require('../warn');

describe('Warn', function() {
  var Airbrake = require('../airbrake');

  var email = 'test@example.com';
  var error = 'Oops';

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();
  });

  it('cards is defined', function() {
    expect(Warn.cards).toBeDefined();
  });

  it('general is defined', function() {
    expect(Warn.general).toBeDefined();
  });

  it('users is defined', function() {
    expect(Warn.users).toBeDefined();
  });

  describe('#general', function() {
    var name = 'general-error';
    var params = {
      email: email
    };

    beforeEach(function() {
      Warn.general(name, error, params, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(error, name, params);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ General - ' + name);
      expect(console.log.mock.calls[0]).toEqual(['-> Params: ', params]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });
});
