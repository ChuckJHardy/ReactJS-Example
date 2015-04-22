'use strict';

var endpoints = {
  subscribe: 'https://uk1.api.mailchimp.com/2.0/lists/subscribe.json',
};

var subscribe = function(adapter, email) {
  return adapter
    .post(endpoints.subscribe)
    .set('Accept', 'application/json')
    .send({
      apikey: __MAILCHIMP_API_KEY__,
      id: __MAILCHIMP_LIST_ID__,
      email: {
        email: email,
      }
    });
};

module.exports = {
  subscribe: subscribe,
};
