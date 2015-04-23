'use strict';

jest.dontMock('../mailchimp_dao');

var MailchimpDAO = require('../mailchimp_dao');

describe('MailchimpDAO', function() {
  var assets = {};
  var email = 'test@example.com';

  var mockAdapter = {
    ajax: jest.genMockFunction()
  };

  describe('#subscribe', function() {
    var subject = function() {
      return MailchimpDAO.subscribe(mockAdapter, email);
    };

    var url = 'http://smartpickings.us9.list-manage.com/subscribe/post-json?u=' + __MAILCHIMP_API_KEY__ + '&id=' + __MAILCHIMP_LIST_ID__ + '&c=?';

    it('returns agent', function() {
      subject();

      expect(mockAdapter.ajax).toBeCalledWith({
        type: 'POST',
        crossDomain: true,
        dataType: 'jsonp',
        timeout: 10000,
        url: url,
        data: { 'EMAIL': email }
      });
    });
  });
});
