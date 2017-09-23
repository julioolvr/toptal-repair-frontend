import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

import repairPropType from '../../../proptypes/repair';

function RepairRow({ repair, canDeleteRepair, onDeleteRepair }) {
  return (
    <g.Div padding=".8em" borderBottom="1px solid rgba(0, 0, 0, .1)">
      {repair.title}
      {canDeleteRepair && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDeleteRepair(repair.id);
          }}
        >
          X
        </button>
      )}
    </g.Div>
  );
}

RepairRow.propTypes = {
  repair: repairPropType.isRequired,
  canDeleteRepair: PropTypes.bool.isRequired,
  onDeleteRepair: PropTypes.func,
};

RepairRow.defaultProps = {
  onDeleteRepair: () => {},
};

export default RepairRow;
