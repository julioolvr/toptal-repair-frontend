import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import api from '../lib/api';

import { addRepair } from './repairs';

// Action types
const ADD_REPAIR_START = 'ADD_REPAIR_START';
const ADD_REPAIR_SUCCESS = 'ADD_REPAIR_SUCCESS';
const ADD_REPAIR_ERROR = 'ADD_REPAIR_ERROR';

// Action creators
export function addRepairRequest(repair) {
  return {
    type: ADD_REPAIR_START,
    payload: repair,
  };
}

export function addedRepairSuccessfully(repair) {
  return {
    type: ADD_REPAIR_SUCCESS,
    payload: repair,
  };
}

export function addRepairFailed(error) {
  return {
    type: ADD_REPAIR_ERROR,
    payload: error,
  };
}

// Epic
function createEpic(action$) {
  return action$.ofType(ADD_REPAIR_START).mergeMap(action =>
    api
      .addRepair(action.payload)
      .mergeMap(repair => [addedRepairSuccessfully(repair), addRepair(repair)])
      .catch(err => Observable.of(addRepairFailed(err))),
  );
}

export const epic = combineEpics(createEpic);

// Reducer
const INITIAL_STATE = {
  isFetching: false,
  error: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_REPAIR_START:
      return { ...state, isFetching: true, error: null };
    case ADD_REPAIR_SUCCESS:
      return { ...state, isFetching: false, error: null };
    case ADD_REPAIR_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}

export default reducer;
