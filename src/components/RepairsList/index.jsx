import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import userPropType from '../../proptypes/user';
import repairPropType from '../../proptypes/repair';
import RepairRow from './RepairRow';
import EmptyRepairsList from './EmptyRepairsList';
import { loadRepairsRequest, deleteRepairRequest } from '../../ducks/repairRequest';

function canAddRepairs(user) {
  return user.manager;
}

function canDeleteRepairs(user) {
  return user.manager;
}

function canEditRepairs(user) {
  return user.manager;
}

class RepairsList extends React.Component {
  componentDidMount() {
    this.props.loadRepairs();
  }

  render() {
    const { repairs, user, history } = this.props;
    let content;

    if (repairs.length === 0) {
      content = (
        <EmptyRepairsList
          onAddRepair={() => history.push('/repairs/add')}
          canAddRepairs={canAddRepairs(user)}
        />
      );
    } else {
      const repairsList = repairs.map(repair => (
        <RepairRow
          key={repair.id}
          repair={repair}
          canDeleteRepair={canDeleteRepairs(user)}
          onDeleteRepair={this.props.deleteRepair}
          canEditRepair={canEditRepairs(user)}
          onEditRepair={id => history.push(`/repairs/${id}/edit`)}
        />
      ));

      content = (
        <div>
          {canAddRepairs(user) && (
            <div>
              <button onClick={() => history.push('/repairs/add')}>Add repair</button>
            </div>
          )}
          <div>{repairsList}</div>
        </div>
      );
    }

    return (
      <g.Div height="100%" backgroundColor="rgba(255,255,255,.7)">
        {content}
      </g.Div>
    );
  }
}

RepairsList.propTypes = {
  repairs: PropTypes.arrayOf(repairPropType),
  user: userPropType.isRequired,
  loadRepairs: PropTypes.func.isRequired,
  deleteRepair: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

RepairsList.defaultProps = {
  repairs: [],
  deleteRepair: () => {},
};

function mapStateToProps(state) {
  return {
    repairs: Object.values(state.repairs),
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  loadRepairs: loadRepairsRequest,
  deleteRepair: deleteRepairRequest,
};

export { RepairsList };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RepairsList));
