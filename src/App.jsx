import React from 'react';
import './App.css';

import RepairsList from './components/RepairsList';

function App() {
  const fakeRepairs = [
    { id: 1, title: 'First repair' },
    { id: 2, title: 'Second repair' },
    { id: 3, title: 'Third repair' },
  ];

  return (
    <div className="App">
      <RepairsList repairs={fakeRepairs} />
    </div>
  );
}

export default App;
