import React from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import repairPropType from '../../proptypes/repair';
import HourPicker from '../HourPicker';

class RepairForm extends React.Component {
  state = {
    dateFocused: false,
  };

  render() {
    const { openingHour, closingHour, repair, onChange } = this.props;

    return (
      <div>
        <label htmlFor="repair-title">Title</label>
        <input
          id="repair-title"
          value={repair.title}
          onChange={e => onChange({ ...repair, title: e.target.value })}
        />

        <label htmlFor="repair-description">Description</label>
        <textarea
          id="repair-description"
          value={repair.description}
          onChange={e => onChange({ ...repair, description: e.target.value })}
        />

        <SingleDatePicker
          date={moment(repair.datetime)}
          onDateChange={newDate =>
            onChange({
              ...repair,
              datetime: newDate
                .clone()
                .hour(moment(repair.datetime).hour())
                .toISOString(),
            })}
          focused={this.state.dateFocused}
          onFocusChange={({ focused }) => this.setState({ dateFocused: focused })}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
        />

        <HourPicker
          hour={moment(repair.datetime).hour()}
          onHourChange={time =>
            onChange({
              ...repair,
              datetime: moment(repair.datetime)
                .hour(time)
                .toISOString(),
            })}
          min={openingHour}
          max={closingHour}
        />
      </div>
    );
  }
}

RepairForm.propTypes = {
  repair: repairPropType.isRequired,
  openingHour: PropTypes.number.isRequired,
  closingHour: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

RepairForm.defaultProps = {
  onChange: () => {},
};

export default RepairForm;
