import React from 'react';

import './styles.css';
import repairPropType from '../../../proptypes/repair';

function RepairRow({ repair }) {
  return <div className="RepairRow">{repair.title}</div>;
}

RepairRow.propTypes = {
  repair: repairPropType.isRequired,
};

export default RepairRow;
