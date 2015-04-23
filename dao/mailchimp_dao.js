'use strict';

var endpoints = {
  subscribe: 'http://smartpickings.us9.list-manage.com/subscribe/post-json?u=' + __MAILCHIMP_API_KEY__ + '&id=' + __MAILCHIMP_LIST_ID__ + '&c=?'
};

var subscribe = function(adapter, email) {
  return adapter.ajax({
    type: 'POST',
    crossDomain: true,
    dataType: 'jsonp',
    timeout: 10000,
    url: endpoints.subscribe,
    data: { 'EMAIL': email }
  });
};

module.exports = {
  subscribe: subscribe,
};
