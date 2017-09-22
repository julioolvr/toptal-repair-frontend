import React from 'react';
import PropTypes from 'prop-types';

function HourPicker({ hour, onHourChange, max, min, unavailable }) {
  const hours = [];

  for (let i = 0; i < 24; i += 1) {
    hours.push(
      <button
        key={i}
        disabled={i < min || i > max || unavailable.includes(i)}
        onClick={(e) => {
          e.preventDefault();
          onHourChange(i);
        }}
      >
        {i}
        {hour === i ? '*' : ''}
      </button>,
    );
  }

  return <div>{hours}</div>;
}

HourPicker.propTypes = {
  hour: PropTypes.number.isRequired,
  onHourChange: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  unavailable: PropTypes.arrayOf(PropTypes.number),
};

HourPicker.defaultProps = {
  onHourChange: () => {},
  min: 0,
  max: 23,
  unavailable: [],
};

export default HourPicker;
