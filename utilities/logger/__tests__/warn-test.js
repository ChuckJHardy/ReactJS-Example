'use strict';

jest.dontMock('../warn');

var Warn = require('../warn');

describe('Logger/Warn', function() {
  var email = 'test@example.com';
  var password = 'password';
  var error = 'Oops';

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();

    window.airbrake = {
      push: jest.genMockFunction()
    };
  });

  describe('#general', function() {
    var name = 'general-error';
    var params = {
      email: email
    };

    beforeEach(function() {
      Warn.general(name, error, params, true);
    });

    it('pushes to airbrake', function() {
      expect(window.airbrake.push).toBeCalledWith({
        error: error,
        context: { component: name },
        environment: { navigator_vendor: window.navigator.vendor },
        params: params
      });
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ General - ' + name);
      expect(console.log.mock.calls[0]).toEqual(['-> Params: ', params]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#users', function() {
    describe('#emailTaken', function() {
      beforeEach(function() {
        Warn.users.emailTaken(email, password, error, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Email Taken');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#invalidEmail', function() {
      beforeEach(function() {
        Warn.users.invalidEmail(email, password, error, true);
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Invalid Email');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userCreateFail', function() {
      beforeEach(function() {
        Warn.users.createFail(email, password, error, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userCreateFail' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Creation Failure');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userNotFound', function() {
      beforeEach(function() {
        Warn.users.notFound(email, password, error, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userNotFound' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Not Found');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userAccessDenied', function() {
      var accessKey = 'access-key';

      beforeEach(function() {
        Warn.users.accessDenied(email, password, error, accessKey, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userAccessDenied' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email,
            accessKey: accessKey
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Access Denied');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
        expect(console.log.mock.calls[2]).toEqual(['-> Access Key: ', accessKey]);
        expect(console.log.mock.calls[3]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userInvalid', function() {
      beforeEach(function() {
        Warn.users.invalidUser(email, error, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userInvalid' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Invalid');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userPasswordResetFail', function() {
      beforeEach(function() {
        Warn.users.passwordResetFail(email, error, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userPasswordResetFail' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Password Reset Failure');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });

    describe('#userSubscribe', function() {
      var listId = __MAILCHIMP_LIST_ID__;

      beforeEach(function() {
        Warn.users.subscribe(email, listId, error, true);
      });

      it('pushes to airbrake', function() {
        expect(window.airbrake.push).toBeCalledWith({
          error: error,
          context: { component: 'userSubscribe' },
          environment: { navigator_vendor: window.navigator.vendor },
          params: {
            email: email,
            listId: listId
          }
        });
      });

      it('outputs expected logs', function() {
        expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Subscription Failure');
        expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
        expect(console.log.mock.calls[1]).toEqual(['-> List ID: ', listId]);
        expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
        expect(console.groupEnd).toBeCalled();
      });
    });
  });
});
