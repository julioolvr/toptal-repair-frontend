import { combineReducers } from 'redux';

import auth from './ducks/auth';
import repairs from './ducks/repairs';
import repairRequest from './ducks/repairRequest';

export default combineReducers({
  auth,
  repairs,
  repairRequest,
});
