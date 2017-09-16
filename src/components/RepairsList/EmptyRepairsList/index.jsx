import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

function EmptyRepairsList({ onAddRepair, canAddRepairs }) {
  return (
    <g.Div
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      fontSize="1.8em"
    >
      {canAddRepairs ? (
        <g.Div textAlign="center">
          <div>No repairs</div>
          <g.Button
            fontSize="1.2em"
            marginTop=".5em"
            padding=".5em 1em"
            backgroundColor="#0077dd"
            border="none"
            cursor="pointer"
            color="#222"
            onClick={onAddRepair}
          >
            +
          </g.Button>
        </g.Div>
      ) : (
        <div>You have no repairs assigned</div>
      )}
    </g.Div>
  );
}

EmptyRepairsList.propTypes = {
  canAddRepairs: PropTypes.bool.isRequired,
  onAddRepair: PropTypes.func,
};

EmptyRepairsList.defaultProps = {
  onAddRepair: () => {},
};

export default EmptyRepairsList;
