import { ActionsObservable } from 'redux-observable';

import reducer, {
  epic,
  addRepairRequest,
  addedRepairSuccessfully,
  addRepairFailed,
} from './repairRequest';
import api from '../lib/api';

jest.mock('../lib/api', () => ({ addRepair: jest.fn() }));

describe('ducks/repairRequest', () => {
  describe('action creators', () => {
    describe('addRepairRequest', () => {
      it('generates an action with type ADD_REPAIR_START and the given repair as the payload', () => {
        const repair = {};
        const action = addRepairRequest(repair);

        expect(action.type).toBe('ADD_REPAIR_START');
        expect(action.payload).toBe(repair);
      });
    });

    describe('addedRepairSuccessfully', () => {
      it('generates an action with type ADD_REPAIR_SUCCESS and the given repair as the payload', () => {
        const repair = {};
        const action = addedRepairSuccessfully(repair);

        expect(action.type).toBe('ADD_REPAIR_SUCCESS');
        expect(action.payload).toBe(repair);
      });
    });

    describe('addRepairFailed', () => {
      it('generates an action with type ADD_REPAIR_ERROR and the given error as the payload', () => {
        const error = new Error();
        const action = addRepairFailed(error);

        expect(action.type).toBe('ADD_REPAIR_ERROR');
        expect(action.payload).toBe(error);
      });
    });
  });

  describe('epic', () => {
    describe('create', () => {
      it('creates the repair through the api on ADD_REPAIR_START', (done) => {
        const repair = {};
        const action$ = ActionsObservable.from([addRepairRequest(repair)]);

        api.addRepair.mockImplementation(() => ActionsObservable.create());

        epic(action$)
          .first()
          .subscribe(() => {
            expect(api.addRepair).toHaveBeenCalledWith(repair);
            done();
          });
      });

      it('emits an ADD_REPAIR_SUCCESS action if the API call succeeds', (done) => {
        const action$ = ActionsObservable.from([addRepairRequest({})]);
        const repair = {};

        api.addRepair.mockImplementation(() => ActionsObservable.of(repair));

        epic(action$)
          .filter(action => action.type === 'ADD_REPAIR_SUCCESS')
          .subscribe((action) => {
            expect(action.payload).toBe(repair);
            done();
          });
      });

      it('emits an ADD_REPAIR action if the API call succeeds', (done) => {
        const action$ = ActionsObservable.from([addRepairRequest({})]);
        const repair = {};

        api.addRepair.mockImplementation(() => ActionsObservable.of(repair));

        epic(action$)
          .filter(action => action.type === 'ADD_REPAIR')
          .subscribe((action) => {
            expect(action.payload).toBe(repair);
            done();
          });
      });

      it('emits an ADD_REPAIR_ERROR action if the API call fails', (done) => {
        const action$ = ActionsObservable.from([addRepairRequest({})]);
        const error = new Error();

        api.addRepair.mockImplementation(() => ActionsObservable.throw(error));

        epic(action$)
          .filter(action => action.type === 'ADD_REPAIR_ERROR')
          .subscribe((action) => {
            expect(action.payload).toBe(error);
            done();
          });
      });
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('is not fetching by default', () => {
        const state = reducer(undefined, {});
        expect(state.isFetching).toBe(false);
      });

      it('has no error by default', () => {
        const state = reducer(undefined, {});
        expect(state.error).toBe(null);
      });
    });

    describe('on ADD_REPAIR_START', () => {
      it('sets the error to null', () => {
        const state = reducer({ error: new Error() }, { type: 'ADD_REPAIR_START' });
        expect(state.error).toBe(null);
      });

      it('sets isFetching to true', () => {
        const state = reducer({ isFetching: false }, { type: 'ADD_REPAIR_START' });
        expect(state.isFetching).toBe(true);
      });
    });

    describe('on ADD_REPAIR_SUCCESS', () => {
      it('sets the error to null', () => {
        const state = reducer({ error: new Error() }, { type: 'ADD_REPAIR_SUCCESS' });
        expect(state.error).toBe(null);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'ADD_REPAIR_SUCCESS' });
        expect(state.isFetching).toBe(false);
      });
    });

    describe('on ADD_REPAIR_ERROR', () => {
      it('sets the error to the one given in the payload', () => {
        const error = new Error();
        const state = reducer({ error: null }, { type: 'ADD_REPAIR_ERROR', payload: error });
        expect(state.error).toBe(error);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'ADD_REPAIR_ERROR' });
        expect(state.isFetching).toBe(false);
      });
    });
  });
});
