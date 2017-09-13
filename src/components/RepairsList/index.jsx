import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import RepairRow from './RepairRow';
import EmptyRepairsList from './EmptyRepairsList';

function RepairsList({ repairs = [] }) {
  let content;

  if (repairs.length === 0) {
    content = <EmptyRepairsList />;
  } else {
    content = repairs.map(repair => <RepairRow key={repair.id} repair={repair} />);
  }

  return <div className="RepairsList">{content}</div>;
}

RepairsList.propTypes = {
  repairs: PropTypes.arrayOf(PropTypes.object),
};

RepairsList.defaultProps = {
  repairs: [],
};

export default RepairsList;
