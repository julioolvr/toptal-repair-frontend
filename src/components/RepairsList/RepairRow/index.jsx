import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

import repairPropType from '../../../proptypes/repair';

function RepairRow({ repair, canDeleteRepair, onDeleteRepair, canEditRepair, onEditRepair }) {
  return (
    <g.Div padding=".8em" borderBottom="1px solid rgba(0, 0, 0, .1)">
      {repair.title}
      {canEditRepair && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onEditRepair(repair.id);
          }}
        >
          Edit
        </button>
      )}
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
  canEditRepair: PropTypes.bool.isRequired,
  onEditRepair: PropTypes.func,
};

RepairRow.defaultProps = {
  onDeleteRepair: () => {},
  onEditRepair: () => {},
};

export default RepairRow;
