import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import api from '../lib/api';

// Action types
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT_START = 'LOGOUT_START';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';

// Action creators
export function login(email, password) {
  return {
    type: LOGIN_START,
    payload: { email, password },
  };
}

export function loginSuccessful(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
}

export function logout() {
  return { type: LOGOUT_START };
}

export function logoutSuccessful() {
  return { type: LOGOUT_SUCCESS };
}

export function logoutFailed(error) {
  return {
    type: LOGOUT_FAILED,
    payload: error,
  };
}

// Epics
function loginEpic(action$) {
  return action$.ofType(LOGIN_START).mergeMap(action =>
    api
      .login(action.payload.email, action.payload.password)
      .mergeMap(response => response.json())
      .map(loginSuccessful)
      .catch(err => Observable.of(loginFailed(err))),
  );
}

function logoutEpic(action$) {
  return action$.ofType(LOGOUT_START).mergeMap(() =>
    api
      .logout()
      .map(logoutSuccessful)
      .catch(err => Observable.of(logoutFailed(err))),
  );
}

export const epic = combineEpics(loginEpic, logoutEpic);

// Reducer
const INITIAL_STATE = {
  isAuthenticated: false,
  isFetching: false,
  user: null,
  error: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isFetching: true, isAuthenticated: false, user: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_START:
      return { ...state, isFetching: false, isAuthenticated: false, user: null, error: null };
    default:
      return state;
  }
}

export default reducer;
