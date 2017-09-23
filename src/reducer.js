import { combineReducers } from 'redux';

import auth, { LOGOUT_START } from './ducks/auth';
import repairs from './ducks/repairs';
import repairRequest from './ducks/repairRequest';

const appReducer = combineReducers({
  auth,
  repairs,
  repairRequest,
});

function rootReducer(baseState, action) {
  let state = baseState;

  if (action.type === LOGOUT_START) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
