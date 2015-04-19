'use strict';

jest.dontMock('../lockdown');

describe('Lockdown', function() {
  var Lockdown = require('../lockdown');

  it('with email that is allowed access', function() {
    var email = 'lockdown-test-key@example.com';
    expect(Lockdown.opened(email)).toEqual(true);
  });

  it('with email that is not allowed access', function() {
    var email = 'test@example.com';
    expect(Lockdown.opened(email)).toEqual(false);
  });
});
