import React from 'react';
import g from 'glamorous';

import RepairsList from './components/RepairsList';

function App() {
  const fakeRepairs = [
    { id: 1, title: 'First repair' },
    { id: 2, title: 'Second repair' },
    { id: 3, title: 'Third repair' },
  ];

  return (
    <g.Div
      height="100vh"
      padding="3em"
      boxSizing="border-box"
      backgroundColor="#99ddff"
      color="#333"
    >
      <RepairsList repairs={fakeRepairs} />
    </g.Div>
  );
}

export default App;
