'use strict';

jest.dontMock('../warn');

var Warn = require('../warn');

describe('Logger/Warn', function() {
  describe('#users', function() {
    var email = 'test@example.com';
    var password = 'password';
    var error = 'Oops';

    beforeEach(function() {
      console.groupCollapsed = jest.genMockFunction();
      console.log = jest.genMockFunction();
      console.groupEnd = jest.genMockFunction();
    });

    describe('#emailTaken', function() {
      beforeEach(function() {
        Warn.users.emailTaken(email, password, error, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Email Taken');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#invalidEmail', function() {
      beforeEach(function() {
        Warn.users.invalidEmail(email, password, error, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Invalid Email');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });
  });
});
