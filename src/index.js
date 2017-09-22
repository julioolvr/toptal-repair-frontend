/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';

import './index.css';
import reducers from './reducer';
import epics from './epic';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState } from './lib/localStorageState';

const epicMiddleware = createEpicMiddleware(epics);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, loadState(), composeEnhancers(applyMiddleware(epicMiddleware)));

// TODO: Clear state on logout
Observable.create((obs) => {
  store.subscribe(() => {
    obs.next(store.getState());
  });
})
  .debounceTime(1000)
  .subscribe(saveState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
