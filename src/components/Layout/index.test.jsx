import React from 'react';
import { shallow } from 'enzyme';

import Layout from '.';

it('renders a layout without a user', () => {
  const wrapper = shallow(
    <Layout isUserAuthenticated={false}>
      <div>Content</div>
    </Layout>,
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a layout with a user', () => {
  const wrapper = shallow(
    <Layout isUserAuthenticated>
      <div>Content</div>
    </Layout>,
  );
  expect(wrapper).toMatchSnapshot();
});
