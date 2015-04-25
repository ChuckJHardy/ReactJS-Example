'use strict';

jest.dontMock('../notice');

var Notice = require('../notice');

describe('Notice', function() {
  it('users is defined', function() {
    expect(Notice.users).toBeDefined();
  });
});
