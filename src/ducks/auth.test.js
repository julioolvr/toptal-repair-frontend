import { ActionsObservable } from 'redux-observable';
import reducer, { epic, login, loginSuccessful, loginFailed } from './auth';
import api from '../lib/api';

jest.mock('../lib/api', () => ({ login: jest.fn() }));

describe('ducks/auth', () => {
  describe('action creators', () => {
    describe('login', () => {
      it('generates a LOGIN_START action with the given email and password', () => {
        const email = 'test@test.com';
        const password = 'testpassword';
        const action = login(email, password);

        expect(action.type).toBe('LOGIN_START');
        expect(action.payload.email).toBe(email);
        expect(action.payload.password).toBe(password);
      });
    });

    describe('loginSuccessful', () => {
      it('generates a LOGIN_SUCCESS action with the given user as the payload', () => {
        const user = {};
        const action = loginSuccessful(user);

        expect(action.type).toBe('LOGIN_SUCCESS');
        expect(action.payload).toBe(user);
      });
    });

    describe('loginFailed', () => {
      it('generates a LOGIN_FAILED action with the given error as the payload', () => {
        const error = new Error();
        const action = loginFailed(error);

        expect(action.type).toBe('LOGIN_FAILED');
        expect(action.payload).toBe(error);
      });
    });
  });

  describe('epic', () => {
    it('logins through the api on LOGIN_START', (done) => {
      const email = 'test@test.com';
      const password = '123456';
      const action$ = ActionsObservable.from([login(email, password)]);

      api.login.mockImplementation(() => ActionsObservable.create());

      epic(action$)
        .first()
        .subscribe(() => {
          expect(api.login).toHaveBeenCalledWith(email, password);
          done();
        });
    });

    it('emits a LOGIN_SUCCESS action if the API call succeeds', (done) => {
      const action$ = ActionsObservable.from([
        login('test@test.com', '123456'),
      ]);
      const user = {};

      api.login.mockImplementation(() => ActionsObservable.of(user));

      epic(action$)
        .ofType('LOGIN_SUCCESS')
        .subscribe((action) => {
          expect(action.payload).toBe(user);
          done();
        });
    });

    it('emits a LOGIN_FAILED action if the API call fails', (done) => {
      const action$ = ActionsObservable.from([
        login('test@test.com', '123456'),
      ]);
      const error = new Error();

      api.login.mockImplementation(() => ActionsObservable.throw(error));

      epic(action$)
        .ofType('LOGIN_FAILED')
        .subscribe((action) => {
          expect(action.payload).toBe(error);
          done();
        });
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('is not authenticated by default', () => {
        const state = reducer(undefined, {});
        expect(state.isAuthenticated).toBe(false);
      });

      it('is not fetching by default', () => {
        const state = reducer(undefined, {});
        expect(state.isFetching).toBe(false);
      });

      it('has no user by default', () => {
        const state = reducer(undefined, {});
        expect(state.user).toBe(null);
      });

      it('has no error by default', () => {
        const state = reducer(undefined, {});
        expect(state.error).toBe(null);
      });
    });

    describe('on LOGIN_START', () => {
      it('sets the user to null', () => {
        const state = reducer({ user: {} }, { type: 'LOGIN_START' });
        expect(state.user).toBe(null);
      });

      it('sets isAuthenticated to false', () => {
        const state = reducer(
          { isAuthenticated: true },
          { type: 'LOGIN_START' },
        );
        expect(state.isAuthenticated).toBe(false);
      });

      it('sets isFetching to true', () => {
        const state = reducer({ isFetching: false }, { type: 'LOGIN_START' });
        expect(state.isFetching).toBe(true);
      });
    });

    describe('on LOGIN_SUCCESS', () => {
      it("sets the user to the one in the action's payload", () => {
        const user = {};
        const state = reducer(
          { user: null },
          { type: 'LOGIN_SUCCESS', payload: user },
        );
        expect(state.user).toBe(user);
      });

      it('sets the error to null', () => {
        const state = reducer(
          { error: new Error() },
          { type: 'LOGIN_SUCCESS' },
        );
        expect(state.error).toBe(null);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'LOGIN_SUCCESS' });
        expect(state.isFetching).toBe(false);
      });

      it('sets isAuthenticated to true', () => {
        const state = reducer(
          { isAuthenticated: false },
          { type: 'LOGIN_SUCCESS' },
        );
        expect(state.isAuthenticated).toBe(true);
      });
    });

    describe('on LOGIN_FAILED', () => {
      it('sets the user to null', () => {
        const state = reducer({ user: {} }, { type: 'LOGIN_FAILED' });
        expect(state.user).toBe(null);
      });

      it('sets the error to the one given in the payload', () => {
        const error = new Error();
        const state = reducer(
          { error: null },
          { type: 'LOGIN_FAILED', payload: error },
        );
        expect(state.error).toBe(error);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'LOGIN_FAILED' });
        expect(state.isFetching).toBe(false);
      });

      it('sets isAuthenticated to false', () => {
        const state = reducer(
          { isAuthenticated: true },
          { type: 'LOGIN_FAILED' },
        );
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });
});
