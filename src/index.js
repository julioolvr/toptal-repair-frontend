/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createEpicMiddleware } from 'redux-observable';

import './index.css';
import reducers from './reducer';
import epics from './epic';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const fakeRepairs = {
  1: { id: 1, title: 'First repair' },
  2: { id: 2, title: 'Second repair' },
  3: { id: 3, title: 'Third repair' },
};

const epicMiddleware = createEpicMiddleware(epics);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  reducers,
  { repairs: fakeRepairs },
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
