// Import RxJS operators
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { combineEpics } from 'redux-observable';

import { epic as auth } from './ducks/auth';
import { epic as repairs } from './ducks/repairRequest';

export default combineEpics(auth, repairs);
