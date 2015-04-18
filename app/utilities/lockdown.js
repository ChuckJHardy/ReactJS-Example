'use strict';

module.exports = {
  opened: function(email) {
    var regex = new RegExp(__LOCKDOWN_KEY__);
    return !!email.match(regex);
  }
};
