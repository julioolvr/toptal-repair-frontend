import React from 'react';
import g from 'glamorous';

import repairPropType from '../../../proptypes/repair';

function RepairRow({ repair }) {
  return (<g.Div padding=".8em" borderBottom="1px solid rgba(0, 0, 0, .1)">
    {repair.title}
  </g.Div>);
}

RepairRow.propTypes = {
  repair: repairPropType.isRequired,
};

export default RepairRow;
