import React from 'react';
import { shallow } from 'enzyme';

import EmptyRepairsList from '.';

it('renders a message saying that the list is empty', () => {
  const wrapper = shallow(<EmptyRepairsList />);
  expect(wrapper).toMatchSnapshot();
});
