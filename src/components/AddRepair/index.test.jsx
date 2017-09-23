import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';

import { AddRepair } from '.';

function fixedDate() {
  return moment('20-09-2017 14:00', 'DD-MM-YYYY HH:mm');
}

it('renders the add repair form', () => {
  const wrapper = shallow(<AddRepair onAdd={() => {}} onCancel={() => {}} />);

  // Force today's date so that the snapshot matches
  wrapper.setState({ repair: { datetime: fixedDate().toISOString() } });

  expect(wrapper).toMatchSnapshot();
});

describe('onCancel', () => {
  it('executes the onCancel callback when clicking the cancel button', () => {
    const onCancel = jest.fn();
    const wrapper = shallow(<AddRepair onAdd={() => {}} onCancel={onCancel} />);

    wrapper
      .findWhere(el => el.is('button') && el.text() === 'Cancel')
      .simulate('click', { preventDefault: () => {} });

    expect(onCancel).toHaveBeenCalled();
  });
});

describe('onAdd', () => {
  it('executes the onAdd callback with the repair title, description and datetime when submitting the form', () => {
    const onAdd = jest.fn();
    const wrapper = shallow(<AddRepair onAdd={onAdd} onCancel={() => {}} />);

    const title = 'Test repair';
    const description = 'Test description';
    const datetime = fixedDate().toISOString();

    wrapper.setState({ repair: { title, description, datetime } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    const submittedRepair = onAdd.mock.calls[onAdd.mock.calls.length - 1][0];
    expect(submittedRepair).toMatchObject({ title, description, datetime });
  });
});

describe('default hour', () => {
  afterEach(() => MockDate.reset());

  it('is 8 if current hour is less than or equal to 8', () => {
    MockDate.set(moment('20-09-2017 7:00', 'DD-MM-YYYY HH:mm'));
    const wrapper = shallow(<AddRepair onAdd={() => {}} onCancel={() => {}} />);
    expect(moment(wrapper.find('RepairForm').prop('repair').datetime).hour()).toEqual(8);
  });

  it('is 17 if current hour is greater than or equal to 17', () => {
    MockDate.set(moment('20-09-2017 20:00', 'DD-MM-YYYY HH:mm'));
    const wrapper = shallow(<AddRepair onAdd={() => {}} onCancel={() => {}} />);
    expect(moment(wrapper.find('RepairForm').prop('repair').datetime).hour()).toEqual(17);
  });

  it('is the current hour if it is between 8 and 17', () => {
    const currentHour = 15;
    MockDate.set(moment(`20-09-2017 ${currentHour}:00`, 'DD-MM-YYYY HH:mm'));
    const wrapper = shallow(<AddRepair onAdd={() => {}} onCancel={() => {}} />);
    expect(moment(wrapper.find('RepairForm').prop('repair').datetime).hour()).toEqual(currentHour);
  });
});
