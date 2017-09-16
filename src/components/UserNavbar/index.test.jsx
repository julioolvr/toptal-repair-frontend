import React from 'react';
import { shallow } from 'enzyme';

import { UserNavbar } from '.';

it('renders a navbar', () => {
  const user = { email: 'test@test.com' };
  const wrapper = shallow(<UserNavbar user={user} onLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

it('logs out when clicking the button', () => {
  const onLogout = jest.fn();
  const wrapper = shallow(<UserNavbar user={{}} onLogout={onLogout} />);
  wrapper.find('button').simulate('click');
  expect(onLogout).toHaveBeenCalled();
});
