'use strict';

jest.dontMock('../users');

var Users = require('../users');

describe('FirebaseService/Users', function() {
  describe('#create', function() {
    it('renders test string', function() {
      expect(Users.create()).toEqual('test');
    });
  });
});
