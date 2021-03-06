import reducer, { addRepair, removeRepair } from './repairs';

describe('ducks/repairs', () => {
  describe('action creators', () => {
    describe('addRepair', () => {
      it('generates an ADD_REPAIR action with the given repair as the payload', () => {
        const repair = {};
        const action = addRepair(repair);

        expect(action.type).toBe('ADD_REPAIR');
        expect(action.payload).toBe(repair);
      });
    });

    describe('removeRepair', () => {
      it('generates a REMOVE_REPAIR action with the given id as the payload', () => {
        const id = 42;
        const action = removeRepair(id);

        expect(action.type).toBe('REMOVE_REPAIR');
        expect(action.payload).toBe(id);
      });
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('is an empty object', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchObject({});
      });
    });

    describe('on ADD_REPAIR', () => {
      it('adds the repair based on its id', () => {
        const repair = { id: 42 };
        const state = reducer({}, { type: 'ADD_REPAIR', payload: repair });
        expect(state[repair.id]).toBe(repair);
      });
    });

    describe('on REMOVE_REPAIR', () => {
      it('removes the repair with the given id', () => {
        const repair = { id: 42 };
        const state = reducer(
          { [repair.id]: repair },
          { type: 'REMOVE_REPAIR', payload: repair.id },
        );
        expect(state).not.toHaveProperty(repair.id.toString());
      });
    });
  });
});
