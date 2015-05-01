'use strict';

var Create = require('./cards/create');
var Destroy = require('./cards/destroy');
var Update = require('./cards/update');

module.exports = {
  create: Create,
  destroy: Destroy,
  update: Update,
};
