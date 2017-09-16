import React from 'react';
import { shallow } from 'enzyme';

import { UserNavbar } from '.';

it('renders a navbar', () => {
  const user = { email: 'test@test.com' };
  const wrapper = shallow(<UserNavbar user={user} />);
  expect(wrapper).toMatchSnapshot();
});
