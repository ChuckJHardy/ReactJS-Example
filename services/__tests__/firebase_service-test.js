'use strict';

jest.dontMock('../firebase_service');

describe('FirebaseService', function() {
  var FirebaseService = require('../firebase_service');

  describe('.users', function() {
    it('returns function', function() {
      expect(FirebaseService.users).toBeDefined();
    });
  });
});
