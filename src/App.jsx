import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import g from 'glamorous';

import reducers from './reducers';
import RepairsList from './components/RepairsList';

const fakeRepairs = {
  1: { id: 1, title: 'First repair' },
  2: { id: 2, title: 'Second repair' },
  3: { id: 3, title: 'Third repair' },
};

const store = createStore(reducers, { repairs: fakeRepairs });

function App() {
  return (
    <Provider store={store}>
      <g.Div
        height="100vh"
        padding="3em"
        boxSizing="border-box"
        backgroundColor="#99ddff"
        color="#333"
      >
        <RepairsList repairs={fakeRepairs} />
      </g.Div>
    </Provider>
  );
}

export default App;
