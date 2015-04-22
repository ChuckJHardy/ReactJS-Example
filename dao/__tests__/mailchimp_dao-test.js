'use strict';

jest.dontMock('../mailchimp_dao');

var MailchimpDAO = require('../mailchimp_dao');

describe('MailchimpDAO', function() {
  var assets = {};
  var email = 'test@example.com';

  var mockAdapter = {
    post: function(endpoint) { assets['post'] = endpoint; return mockAdapter; },
    set: function(header, type) { assets[header] = type; return mockAdapter; },
    send: function(params) { assets['send'] = params; return mockAdapter; },
  };

  describe('#subscribe', function() {
    var subject = function() {
      return MailchimpDAO.subscribe(mockAdapter, email);
    };

    it('returns agent', function() {
      expect(subject()).toEqual(mockAdapter);
      expect(assets.post).toEqual('https://uk1.api.mailchimp.com/2.0/lists/subscribe.json');
      expect(assets.send).toEqual({
        apikey: __MAILCHIMP_API_KEY__,
        id: __MAILCHIMP_LIST_ID__,
        email: {
          email: email,
        }
      });
    });
  });
});
