'use strict';

var cachedUser;

module.exports = {
  getCachedUser: function() {
    return cachedUser; 
  },

  getLocalStorageUser: function() {
    return window.localStorage.getItem(__LOCAL_STORAGE_KEY__);
  },

  login: function(uid) {
    cachedUser = uid;
    window.localStorage.setItem(__LOCAL_STORAGE_KEY__, uid);
    this.onChangeListener(uid);
  },

  logout: function() {
    cachedUser = null;
    window.localStorage.removeItem(__LOCAL_STORAGE_KEY__);
    this.onChangeListener(null);
  },

  loggedIn: function() {
    return !!(this.getCachedUser() || this.getLocalStorageUser());
  },

  onChangeListener: function() {}
};
