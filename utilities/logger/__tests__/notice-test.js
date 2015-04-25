'use strict';

jest.dontMock('../notice');

var Notice = require('../notice');

describe('Notice', function() {
  it('cards is defined', function() {
    expect(Notice.cards).toBeDefined();
  });

  it('users is defined', function() {
    expect(Notice.users).toBeDefined();
  });
});
