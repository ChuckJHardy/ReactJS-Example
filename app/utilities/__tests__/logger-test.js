'use strict';

jest.dontMock('../logger');

describe('Logger', function() {
  var Logger = require('../logger');

  describe('.notice', function() {
    it('returns function', function() {
      expect(Logger.notice).toBeDefined();
    });
  });
});
