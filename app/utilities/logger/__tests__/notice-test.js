'use strict';

jest.dontMock('../notice');

var Notice = require('../notice');

describe('Logger/Notice', function() {
  describe('#users', function() {
    describe('#created', function() {
      var email = 'test@example.com';
      var password = 'password';
      var error = 'Oops';

      beforeEach(function() {
        console.groupCollapsed = jest.genMockFunction();
        console.log = jest.genMockFunction();
        console.groupEnd = jest.genMockFunction();

        Notice.users.created(email, password, error, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> User Created');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });
  });
});
