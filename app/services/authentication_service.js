'use strict';

var cachedUser;

module.exports = {
  getCachedUser: function() {
    return cachedUser; 
  },

  login: function(uid) {
    cachedUser = uid;
    this.onChangeListener(uid);
  },

  logout: function() {
    cachedUser = null;
    this.onChangeListener(null);
  },

  loggedIn: function() {
    return !!cachedUser; 
  },

  onChangeListener: function() {}
};
