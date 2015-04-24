'use strict';

var Create = require('./users/create');
var Destroy = require('./users/destroy');
var Find = require('./users/find');
var ResetPassword = require('./users/reset_password');

module.exports = {
  create: Create,
  destroy: Destroy,
  find: Find,
  resetPassword: ResetPassword,
};
