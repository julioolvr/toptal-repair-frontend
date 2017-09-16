import React from 'react';
import { shallow } from 'enzyme';

import { RepairsList } from '.';

it('renders an empty list of repairs', () => {
  const wrapper = shallow(<RepairsList user={{ manager: true }} />);
  expect(wrapper).toMatchSnapshot();
});

it("allows the user to add a repair if they're a manager", () => {
  const wrapper = shallow(<RepairsList user={{ manager: true }} />);
  expect(wrapper.find('EmptyRepairsList').prop('canAddRepairs')).toBe(true);
});

it("prevents the user from adding repair if they're not a manager", () => {
  const wrapper = shallow(<RepairsList user={{ manager: false }} />);
  expect(wrapper.find('EmptyRepairsList').prop('canAddRepairs')).toBe(false);
});

it('renders a list of repairs with content', () => {
  const repairs = [{ id: 1, title: 'Test repair 1' }, { id: 1, title: 'Test repair 1' }];
  const wrapper = shallow(<RepairsList user={{ manager: true }} repairs={repairs} />);
  expect(wrapper).toMatchSnapshot();
});
