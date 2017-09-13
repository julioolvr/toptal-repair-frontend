import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { connect } from 'react-redux';

import RepairRow from './RepairRow';
import EmptyRepairsList from './EmptyRepairsList';

function RepairsList({ repairs = [] }) {
  let content;

  if (repairs.length === 0) {
    content = <EmptyRepairsList />;
  } else {
    content = repairs.map(repair => (
      <RepairRow key={repair.id} repair={repair} />
    ));
  }

  return (
    <g.Div height="100%" backgroundColor="rgba(255,255,255,.7)">
      {content}
    </g.Div>
  );
}

RepairsList.propTypes = {
  repairs: PropTypes.arrayOf(PropTypes.object),
};

RepairsList.defaultProps = {
  repairs: [],
};

function mapStateToProps(state) {
  return {
    repairs: Object.values(state.repairs),
  };
}

export { RepairsList };
export default connect(mapStateToProps)(RepairsList);
