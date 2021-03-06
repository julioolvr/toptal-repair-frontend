import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import api from '../lib/api';

import { addRepair, removeRepair } from './repairs';

// Action types
const ADD_REPAIR_START = 'ADD_REPAIR_START';
const ADD_REPAIR_SUCCESS = 'ADD_REPAIR_SUCCESS';
const ADD_REPAIR_ERROR = 'ADD_REPAIR_ERROR';
const LOAD_REPAIRS_START = 'LOAD_REPAIRS_START';
const LOAD_REPAIRS_SUCCESS = 'LOAD_REPAIRS_SUCCESS';
const LOAD_REPAIRS_ERROR = 'LOAD_REPAIRS_ERROR';
const DELETE_REPAIR_START = 'DELETE_REPAIR_START';
const DELETE_REPAIR_SUCCESS = 'DELETE_REPAIR_SUCCESS';
const DELETE_REPAIR_ERROR = 'DELETE_REPAIR_ERROR';

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

export function loadRepairsRequest() {
  return { type: LOAD_REPAIRS_START };
}

export function loadedRepairsSuccessfully(repairs) {
  return { type: LOAD_REPAIRS_SUCCESS, payload: repairs };
}

export function loadRepairsFailed(error) {
  return { type: LOAD_REPAIRS_ERROR, payload: error };
}

export function deleteRepairRequest(id) {
  return { type: DELETE_REPAIR_START, payload: id };
}

export function deleteRepairSuccess() {
  return { type: DELETE_REPAIR_SUCCESS };
}

export function deleteRepairError(error) {
  return { type: DELETE_REPAIR_ERROR, payload: error };
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

function loadEpic(action$) {
  return action$.ofType(LOAD_REPAIRS_START).mergeMap(() =>
    api
      .loadRepairs()
      .mergeMap(repairs => [loadedRepairsSuccessfully(), ...repairs.map(addRepair)])
      .catch(err => Observable.of(loadRepairsFailed(err))),
  );
}

function deleteEpic(action$) {
  return action$.ofType(DELETE_REPAIR_START).mergeMap(action =>
    api
      .deleteRepair(action.payload)
      .mergeMap(() => [deleteRepairSuccess(), removeRepair(action.payload)])
      .catch(err => Observable.of(deleteRepairError(err))),
  );
}

export const epic = combineEpics(createEpic, loadEpic, deleteEpic);

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
    case LOAD_REPAIRS_START:
      return { ...state, isFetching: true, error: null };
    case LOAD_REPAIRS_SUCCESS:
      return { ...state, isFetching: false, error: null };
    case LOAD_REPAIRS_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case DELETE_REPAIR_START:
      return { ...state, isFetching: true, error: null, id: action.payload };
    case DELETE_REPAIR_SUCCESS:
      return { ...state, isFetching: false, error: null, id: null };
    case DELETE_REPAIR_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}

export default reducer;
