import React from 'react';
import { shallow } from 'enzyme';

import RepairRow from '.';

it('renders a row for a repair', () => {
  const wrapper = shallow(<RepairRow repair={{ title: 'Test repair' }} />);
  expect(wrapper).toMatchSnapshot();
});
