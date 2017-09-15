/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './index.css';
import reducers from './reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const fakeRepairs = {
  1: { id: 1, title: 'First repair' },
  2: { id: 2, title: 'Second repair' },
  3: { id: 3, title: 'Third repair' },
};

const store = createStore(reducers, { repairs: fakeRepairs });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
