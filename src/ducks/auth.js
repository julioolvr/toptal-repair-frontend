// Action types
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';

// Action creators
export function login(username, password) {
  return {
    type: LOGIN_START,
    payload: { username, password },
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
    default:
      return state;
  }
}

export default reducer;
