'use strict';

jest.dontMock('../users');

var Users = require('../users');

describe('Users', function() {
  it('create is defined', function() {
    expect(Users.create).toBeDefined();
  });

  it('destroy is defined', function() {
    expect(Users.destroy).toBeDefined();
  });

  it('find is defined', function() {
    expect(Users.find).toBeDefined();
  });

  it('resetPassword is defined', function() {
    expect(Users.resetPassword).toBeDefined();
  });
});
