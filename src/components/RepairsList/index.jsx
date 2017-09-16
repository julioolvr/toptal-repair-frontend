import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import userPropType from '../../proptypes/user';
import repairPropType from '../../proptypes/repair';
import RepairRow from './RepairRow';
import EmptyRepairsList from './EmptyRepairsList';

function canAddRepairs(user) {
  return user.manager;
}

function RepairsList({ repairs = [], user, history }) {
  let content;

  if (repairs.length === 0) {
    content = (
      <EmptyRepairsList
        onAddRepair={() => history.push('/repairs/add')}
        canAddRepairs={canAddRepairs(user)}
      />
    );
  } else {
    content = repairs.map(repair => <RepairRow key={repair.id} repair={repair} />);
  }

  return (
    <g.Div height="100%" backgroundColor="rgba(255,255,255,.7)">
      {content}
    </g.Div>
  );
}

RepairsList.propTypes = {
  repairs: PropTypes.arrayOf(repairPropType),
  user: userPropType.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

RepairsList.defaultProps = {
  repairs: [],
};

function mapStateToProps(state) {
  return {
    repairs: Object.values(state.repairs),
    user: state.auth.user,
  };
}

export { RepairsList };
export default connect(mapStateToProps)(withRouter(RepairsList));
