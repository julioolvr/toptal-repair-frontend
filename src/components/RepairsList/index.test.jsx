import React from 'react';
import { shallow } from 'enzyme';

import { RepairsList } from '.';

it('renders an empty list of repairs', () => {
  const wrapper = shallow(<RepairsList />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a list of repairs with content', () => {
  const repairs = [
    { id: 1, title: 'Test repair 1' },
    { id: 1, title: 'Test repair 1' },
  ];
  const wrapper = shallow(<RepairsList repairs={repairs} />);
  expect(wrapper).toMatchSnapshot();
});
