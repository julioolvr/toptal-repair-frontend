import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

function EmptyRepairsList({ canAddRepairs }) {
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
        <div>
          <div>No repairs</div>
          <g.Button
            fontSize="1.2em"
            marginTop=".5em"
            padding=".5em 1em"
            backgroundColor="#0077dd"
            border="none"
            cursor="pointer"
            color="#222"
          >
            +
          </g.Button>
        </div>
      ) : (
        <div>You have no repairs assigned</div>
      )}
    </g.Div>
  );
}

EmptyRepairsList.propTypes = {
  canAddRepairs: PropTypes.bool.isRequired,
};

export default EmptyRepairsList;
