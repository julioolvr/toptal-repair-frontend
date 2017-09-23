import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { addRepairRequest } from '../../ducks/repairRequest';
import RepairForm from '../RepairForm';

const OPENING_HOUR = 8;
const CLOSING_HOUR = 17;

class AddRepair extends React.Component {
  state = {
    repair: {
      title: '',
      description: '',
      datetime: moment()
        .hour(Math.max(Math.min(moment().hour(), CLOSING_HOUR), OPENING_HOUR))
        .toISOString(),
    },
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.repair);
  }

  render() {
    // TODO: Maybe change onSubmit for onClick, so that enter on the title
    // field doesn't trigger a save
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <RepairForm
          repair={this.state.repair}
          onChange={newRepair => this.setState({ repair: newRepair })}
          openingHour={OPENING_HOUR}
          closingHour={CLOSING_HOUR}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            this.props.onCancel();
          }}
        >
          Cancel
        </button>
        <button>Create</button>
      </form>
    );
  }
}

AddRepair.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onAdd: addRepairRequest,
};

export { AddRepair };
export default connect(null, mapDispatchToProps)(AddRepair);
