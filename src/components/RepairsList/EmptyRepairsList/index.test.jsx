import React from 'react';
import { shallow } from 'enzyme';

import EmptyRepairsList from '.';

it('renders a message prompting the manager to add a repair', () => {
  const wrapper = shallow(<EmptyRepairsList canAddRepairs />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a message telling the regular user that no repairs are assigned to them', () => {
  const wrapper = shallow(<EmptyRepairsList canAddRepairs={false} />);
  expect(wrapper).toMatchSnapshot();
});
