'use strict';

jest.dontMock('../subscribe');
jest.dontMock('../../support/stub_router_context');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils')
var jQuery = require('jquery');

var App = require('../../components/app');
var MailchimpService = require('../../services/mailchimp_service');

describe('Subscribe', function() {
  var Subscribe = require('../subscribe');

  var assets = {};
  var email = 'test@example.com';

  var setAlert = function(message) { assets['setAlert'] = message; };

  var subject = function() {
    return TestUtils.renderIntoDocument(
      <Subscribe setAlert={setAlert} />
    );
  };

  beforeEach(function() {
    MailchimpService.subscribe = jest.genMockFunction();
    jQuery = jest.genMockFunction().mockReturnThis();
  });

  describe('#handleSubmit', function() {
    it('calls sendToFirebase with expected arguments', function() {
      var localSubject = subject();

      localSubject.refs.email.getDOMNode().value = email;

      localSubject.handleSubmit({preventDefault: jest.genMockFn()})

      expect(MailchimpService.subscribe).toBeCalledWith(
        jQuery,
        email,
        function() {},
        function() {}
      );
    });
  });

  describe('#handlerError', function() {
    it('calls setAlert', function() {
      subject().handlerError();
      expect(assets.setAlert).toEqual('Something failed. Developers have been informed.');
    });
  });

  describe('#handlerSuccess', function() {
    var localSubject = subject();
    localSubject.handlerSuccess();

    it('renders', function() {
      expect(localSubject.getDOMNode().textContent)
        .toContain('Thanks');
    });
  });

  it('renders', function() {
    expect(subject().getDOMNode().textContent)
      .toContain('Subscribe');
  });
});
