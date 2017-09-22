import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import HourPicker from '../HourPicker';

const OPENING_HOUR = 8;
const CLOSING_HOUR = 17;

class AddRepair extends React.Component {
  state = {
    title: '',
    description: '',
    date: moment(),
    time: Math.max(Math.min(moment().hour(), CLOSING_HOUR), OPENING_HOUR),
    dateFocused: false,
  };

  onSubmit(e) {
    e.preventDefault();

    const datetime = this.state.date.clone();
    datetime.hour(this.state.time);

    this.props.onAdd({ title: this.state.title, description: this.state.description, datetime });
  }

  render() {
    // TODO: Maybe change onSubmit for onClick, so that enter on the title
    // field doesn't trigger a save
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <label htmlFor="repair-title">Title</label>
        <input
          id="repair-title"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />

        <label htmlFor="repair-description">Description</label>
        <textarea
          id="repair-description"
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />

        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
          focused={this.state.dateFocused}
          onFocusChange={({ focused }) => this.setState({ dateFocused: focused })}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
        />

        <HourPicker
          hour={this.state.time}
          onHourChange={time => this.setState({ time })}
          min={OPENING_HOUR}
          max={CLOSING_HOUR}
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
  onAdd: payload => ({
    type: 'PLACEHOLDER',
    payload,
  }),
};

export { AddRepair };
export default connect(null, mapDispatchToProps)(AddRepair);
