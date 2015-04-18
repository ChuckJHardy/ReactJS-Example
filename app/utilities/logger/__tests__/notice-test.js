'use strict';

jest.dontMock('../notice');

var Notice = require('../notice');

describe('Logger/Notice', function() {
  var email = 'test@example.com';
  var password = 'password';
  var error = 'Oops';
  var data = {
    uid: 123
  };

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();
  });

  describe('#users', function() {
    describe('#created', function() {
      beforeEach(function() {
        Notice.users.created(email, password, data, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Created');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Data: ', data]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#found', function() {
      beforeEach(function() {
        Notice.users.found(email, password, data, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Found');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Data: ', data]);
        expect(console.groupEnd).toBeCalled();
      });
    });
  });
});
