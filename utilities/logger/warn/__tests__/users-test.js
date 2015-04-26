'use strict';

jest.dontMock('../users');
jest.dontMock('../../runner');

var Users = require('../users');

describe('Users', function() {
  var Airbrake = require('../../airbrake');

  var email = 'test@example.com';
  var password = 'password';
  var error = 'Oops';

  beforeEach(function() {
    console.groupCollapsed = jest.genMockFunction();
    console.log = jest.genMockFunction();
    console.groupEnd = jest.genMockFunction();
  });

  describe('#emailTaken', function() {
    beforeEach(function() {
      Users.emailTaken(email, password, error, true);
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
      Users.invalidEmail(email, password, error, true);
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
      Users.createFail(email, password, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userCreateFail', { email: email }
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Creation Failure');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#userDestoryFail', function() {
    beforeEach(function() {
      Users.destroyFail(email, password, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userDestoryFail', { email: email }
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Destory Failure');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#userNotFound', function() {
    beforeEach(function() {
      Users.notFound(email, password, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userNotFound', { email: email }
      );
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
      Users.accessDenied(email, password, error, accessKey, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userAccessDenied', { email: email, accessKey: accessKey }
      );
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
      Users.invalidUser(email, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userInvalid', { email: email }
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Invalid');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#invalidPassword', function() {
    beforeEach(function() {
      Users.invalidPassword(email, password, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userInvalidPassword', { email: email }
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Invalid Password');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Password: ', password]);
      expect(console.log.mock.calls[2]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });

  describe('#userPasswordResetFail', function() {
    beforeEach(function() {
      Users.passwordResetFail(email, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userPasswordResetFail', { email: email }
      );
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
      Users.subscribe(email, listId, error, true);
    });

    it('pushes to airbrake', function() {
      expect(Airbrake).toBeCalledWith(
        error, 'userSubscribe', { email: email, listId: listId } 
      );
    });

    it('outputs expected logs', function() {
      expect(console.groupCollapsed).toBeCalledWith('-> ✗ User - Subscription Failure');
      expect(console.log.mock.calls[0]).toEqual(['-> Email: ', email]);
      expect(console.log.mock.calls[1]).toEqual(['-> Error: ', error]);
      expect(console.groupEnd).toBeCalled();
    });
  });
});
