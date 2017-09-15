import React from 'react';
import { shallow } from 'enzyme';

import LoginBox from '.';

it('renders an empty login box', () => {
  const wrapper = shallow(<LoginBox onLogin={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

it('calls the onLogin prop when submitting the form', () => {
  const onLogin = jest.fn();
  const wrapper = shallow(<LoginBox onLogin={onLogin} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(onLogin).toHaveBeenCalled();
});
