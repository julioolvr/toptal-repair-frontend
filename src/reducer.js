import { combineReducers } from 'redux';

import auth from './ducks/auth';
import repairs from './ducks/repairs';

export default combineReducers({
  auth,
  repairs,
});
