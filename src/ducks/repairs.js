// Action types
const ADD_REPAIR = 'ADD_REPAIR';

// Action creators
export function addRepair(repair) {
  return {
    type: ADD_REPAIR,
    payload: repair,
  };
}

// Reducer
const INITIAL_STATE = {};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_REPAIR:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

export default reducer;
