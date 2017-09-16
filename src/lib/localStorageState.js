const KEY = 'redux_state';

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (err) {
    // If there's an error we don't save anything to local storage
  }
}
