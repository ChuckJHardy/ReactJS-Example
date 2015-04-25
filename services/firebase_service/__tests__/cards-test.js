'use strict';

jest.dontMock('../cards');

var Cards = require('../cards');

describe('Cards', function() {
  it('create is defined', function() {
    expect(Cards.create).toBeDefined();
  });
});
