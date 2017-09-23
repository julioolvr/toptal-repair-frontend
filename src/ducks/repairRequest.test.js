import { ActionsObservable } from 'redux-observable';

import reducer, {
  epic,
  addRepairRequest,
  addedRepairSuccessfully,
  addRepairFailed,
  loadRepairsRequest,
  loadedRepairsSuccessfully,
  loadRepairsFailed,
  deleteRepairRequest,
  deleteRepairSuccess,
  deleteRepairError,
} from './repairRequest';
import api from '../lib/api';

jest.mock('../lib/api', () => ({ addRepair: jest.fn(), loadRepairs: jest.fn(), deleteRepair: jest.fn() }));

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

    describe('loadRepairsRequest', () => {
      it('generates an action with type LOAD_REPAIRS_START', () => {
        const action = loadRepairsRequest();

        expect(action.type).toBe('LOAD_REPAIRS_START');
      });
    });

    describe('loadedRepairsSuccessfully', () => {
      it('generates an action with type LOAD_REPAIRS_SUCCESS and the given repairs', () => {
        const repairs = [{}];
        const action = loadedRepairsSuccessfully(repairs);

        expect(action.type).toBe('LOAD_REPAIRS_SUCCESS');
        expect(action.payload).toBe(repairs);
      });
    });

    describe('loadRepairsFailed', () => {
      it('generates an action with type LOAD_REPAIRS_ERROR and the given error as the payload', () => {
        const error = new Error();
        const action = loadRepairsFailed(error);

        expect(action.type).toBe('LOAD_REPAIRS_ERROR');
        expect(action.payload).toBe(error);
      });
    });

    describe('deleteRepairRequest', () => {
      it('generates an action with type DELETE_REPAIR_START and the given repair id as the payload', () => {
        const id = 42;
        const action = deleteRepairRequest(id);

        expect(action.type).toBe('DELETE_REPAIR_START');
        expect(action.payload).toBe(id);
      });
    });

    describe('deleteRepairSuccess', () => {
      it('generates an action with type DELETE_REPAIR_SUCCESS', () => {
        const action = deleteRepairSuccess();
        expect(action.type).toBe('DELETE_REPAIR_SUCCESS');
      });
    });

    describe('deleteRepairError', () => {
      it('generates an action with type DELETE_REPAIR_ERROR and the given error as the payload', () => {
        const error = new Error();
        const action = deleteRepairError(error);

        expect(action.type).toBe('DELETE_REPAIR_ERROR');
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

    describe('load', () => {
      it('loads the repairs from the api on LOAD_REPAIRS_START', (done) => {
        const action$ = ActionsObservable.from([loadRepairsRequest()]);

        api.loadRepairs.mockImplementation(() => ActionsObservable.create());

        epic(action$)
          .first()
          .subscribe(() => {
            expect(api.loadRepairs).toHaveBeenCalled();
            done();
          });
      });

      it('emits a LOAD_REPAIRS_SUCCESS action if the API call succeeds', (done) => {
        const action$ = ActionsObservable.from([loadRepairsRequest()]);
        const repairs = [{}];

        api.loadRepairs.mockImplementation(() => ActionsObservable.of(repairs));

        epic(action$)
          .filter(action => action.type === 'LOAD_REPAIRS_SUCCESS')
          .subscribe((action) => {
            expect(action).toBeDefined();
            done();
          });
      });

      it('emits an ADD_REPAIR action for each repair if the API call succeeds', (done) => {
        const action$ = ActionsObservable.from([loadRepairsRequest({})]);
        const repairs = [{ id: 1 }, { id: 2 }];

        api.loadRepairs.mockImplementation(() => ActionsObservable.of(repairs));

        epic(action$)
          .filter(action => action.type === 'ADD_REPAIR')
          .toArray()
          .subscribe((actions) => {
            expect(actions[0].payload).toBe(repairs[0]);
            expect(actions[1].payload).toBe(repairs[1]);
            done();
          });
      });

      it('emits a LOAD_REPAIRS_ERROR action if the API call fails', (done) => {
        const action$ = ActionsObservable.from([loadRepairsRequest()]);
        const error = new Error();

        api.loadRepairs.mockImplementation(() => ActionsObservable.throw(error));

        epic(action$)
          .filter(action => action.type === 'LOAD_REPAIRS_ERROR')
          .subscribe((action) => {
            expect(action.payload).toBe(error);
            done();
          });
      });
    });

    describe('delete', () => {
      it('deletes the repair through the api on DELETE_REPAIR_START', (done) => {
        const id = 42;
        const action$ = ActionsObservable.from([deleteRepairRequest(id)]);

        api.deleteRepair.mockImplementation(() => ActionsObservable.create());

        epic(action$)
          .first()
          .subscribe(() => {
            expect(api.deleteRepair).toHaveBeenCalledWith(id);
            done();
          });
      });

      it('emits a DELETE_REPAIR_SUCCESS action if the API call succeeds', (done) => {
        const action$ = ActionsObservable.from([deleteRepairRequest(42)]);

        api.deleteRepair.mockImplementation(() => ActionsObservable.of({}));

        epic(action$)
          .filter(action => action.type === 'DELETE_REPAIR_SUCCESS')
          .subscribe((action) => {
            expect(action).toBeDefined();
            done();
          });
      });

      it('emits a REMOVE_REPAIR action if the API call succeeds', (done) => {
        const id = 42;
        const action$ = ActionsObservable.from([deleteRepairRequest(id)]);

        api.addRepair.mockImplementation(() => ActionsObservable.of({}));

        epic(action$)
          .filter(action => action.type === 'REMOVE_REPAIR')
          .subscribe((action) => {
            expect(action.payload).toBe(id);
            done();
          });
      });

      it('emits a DELETE_REPAIR_ERROR action if the API call fails', (done) => {
        const action$ = ActionsObservable.from([deleteRepairRequest(42)]);
        const error = new Error();

        api.deleteRepair.mockImplementation(() => ActionsObservable.throw(error));

        epic(action$)
          .filter(action => action.type === 'DELETE_REPAIR_ERROR')
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

    describe('on DELETE_REPAIR_START', () => {
      it('sets the error to null', () => {
        const state = reducer({ error: new Error() }, { type: 'DELETE_REPAIR_START' });
        expect(state.error).toBe(null);
      });

      it('sets isFetching to true', () => {
        const state = reducer({ isFetching: false }, { type: 'DELETE_REPAIR_START' });
        expect(state.isFetching).toBe(true);
      });

      it('sets id to the action\'s payload', () => {
        const id = 42;
        const state = reducer({ id: null }, { type: 'DELETE_REPAIR_START', payload: id });
        expect(state.id).toBe(id);
      });
    });

    describe('on DELETE_REPAIR_SUCCESS', () => {
      it('sets the error to null', () => {
        const state = reducer({ error: new Error() }, { type: 'DELETE_REPAIR_SUCCESS' });
        expect(state.error).toBe(null);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'DELETE_REPAIR_SUCCESS' });
        expect(state.isFetching).toBe(false);
      });

      it('sets id to null', () => {
        const state = reducer({ id: 42 }, { type: 'DELETE_REPAIR_SUCCESS' });
        expect(state.id).toBe(null);
      });
    });

    describe('on DELETE_REPAIR_ERROR', () => {
      it('sets the error to the one given in the payload', () => {
        const error = new Error();
        const state = reducer({ error: null }, { type: 'DELETE_REPAIR_ERROR', payload: error });
        expect(state.error).toBe(error);
      });

      it('sets isFetching to false', () => {
        const state = reducer({ isFetching: true }, { type: 'DELETE_REPAIR_ERROR' });
        expect(state.isFetching).toBe(false);
      });
    });
  });
});
