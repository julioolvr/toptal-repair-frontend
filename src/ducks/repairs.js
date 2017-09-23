// Action types
const ADD_REPAIR = 'ADD_REPAIR';
const REMOVE_REPAIR = 'REMOVE_REPAIR';

// Action creators
export function addRepair(repair) {
  return {
    type: ADD_REPAIR,
    payload: repair,
  };
}

export function removeRepair(id) {
  return {
    type: REMOVE_REPAIR,
    payload: id,
  };
}

// Reducer
const INITIAL_STATE = {};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_REPAIR:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_REPAIR: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

export default reducer;
