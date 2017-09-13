import React from 'react';
import './styles.css';

function EmptyRepairsList() {
  return (<div className="EmptyRepairsList">
    <div>No repairs</div>
    <button className="EmptyRepairsList__button">+</button>
  </div>);
}

export default EmptyRepairsList;
