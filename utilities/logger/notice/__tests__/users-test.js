'use strict';

jest.dontMock('../users');
jest.dontMock('../../runner');

var Users = require('../users');

describe('Users', function() {
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

  describe('#created', function() {
    beforeEach(function() {
      Users.created(email, password, data, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Created');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Data: ', data]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#destroyed', function() {
    beforeEach(function() {
      Users.destroyed(email, password, data, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Destoryed');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Data: ', data]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#found', function() {
    beforeEach(function() {
      Users.found(email, password, data, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Found');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Data: ', data]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#userPasswordReset', function() {
    beforeEach(function() {
      Users.passwordReset(email, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Password Reset');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#userSubscribe', function() {
    var data = { uid: 123 };

    beforeEach(function() {
      Users.subscribe(email, data, true);
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✓ User - Subscribed');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Data: ', data]);
      expect(console.groupEnd).toBeCalled();
    });
  });
});
