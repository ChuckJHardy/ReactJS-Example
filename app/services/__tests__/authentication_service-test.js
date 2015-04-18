'use strict';

jest.dontMock('../authentication_service');

describe('AuthenticationService', function() {
  var AuthenticationService = require('../authentication_service');

  describe('.getCachedUser', function() {
    var subject = AuthenticationService.getCachedUser();

    it('returns cachedUser', function() {
      expect(subject).toEqual(null);
    });
  });

  describe('.login', function() {
    var uid = 123;
    var assets = {};

    beforeEach(function() {
      AuthenticationService.logout();

      AuthenticationService.onChangeListener = function(uid) {
        assets['login'] = uid ;
      };

      AuthenticationService.login(uid);
    });

    it('sets the cachedUser', function() {
      expect(AuthenticationService.getCachedUser()).toEqual(uid);
    });

    it('calls the onChangeListener', function() {
      expect(assets.login).toEqual(uid);
    });
  });

  describe('.logout', function() {
    var assets = {};

    beforeEach(function() {
      AuthenticationService.onChangeListener = function(uid) {
        assets['logout'] = uid ;
      };

      AuthenticationService.logout();
    });

    it('resets cachedUser', function() {
      expect(AuthenticationService.getCachedUser()).toEqual(null);
    });

    it('calls the onChangeListener', function() {
      expect(assets.logout).toEqual(null);
    });
  });

  describe('.loggedIn', function() {
    var assets = {};

    beforeEach(function() {
      AuthenticationService.loggedIn();
    });

    describe('Cached User', function() {
      it('returns false when null', function() {
        expect(AuthenticationService.loggedIn()).toEqual(false);
      });

      it('returns true when assigned', function() {
        AuthenticationService.login(1);
        expect(AuthenticationService.loggedIn()).toEqual(true);
      });
    });
  });
});
