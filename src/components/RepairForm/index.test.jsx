import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

import RepairForm from '.';

const defaultProps = {
  repair: {
    title: 'test repair',
    description: 'test description',
    datetime: moment('20-09-2017 7:00', 'DD-MM-YYYY HH:mm').toISOString(),
  },
  openingHour: 8,
  closingHour: 17,
};

it('renders the form for a repair', () => {
  const wrapper = shallow(<RepairForm {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
