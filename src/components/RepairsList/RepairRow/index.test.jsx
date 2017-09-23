import React from 'react';
import { shallow } from 'enzyme';

import RepairRow from '.';

const defaultProps = {
  repair: {
    title: 'Test repair',
  },
  canDeleteRepair: false,
  canEditRepair: false,
};

it('renders a row for a repair', () => {
  const wrapper = shallow(<RepairRow {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a row for a repair that can be deleted', () => {
  const wrapper = shallow(<RepairRow {...defaultProps} canDeleteRepair />);
  expect(wrapper).toMatchSnapshot();
});

it('calls onDeleteRepair with the repair id when clicking on the X button', () => {
  const repair = { id: 42 };
  const onDeleteRepair = jest.fn();

  const wrapper = shallow(
    <RepairRow {...defaultProps} repair={repair} canDeleteRepair onDeleteRepair={onDeleteRepair} />,
  );

  wrapper
    .findWhere(el => el.is('button') && el.text() === 'X')
    .simulate('click', { preventDefault: () => {} });

  expect(onDeleteRepair).toHaveBeenCalledWith(repair.id);
});
