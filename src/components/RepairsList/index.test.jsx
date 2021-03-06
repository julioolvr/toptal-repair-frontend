import React from 'react';
import { shallow, mount } from 'enzyme';

import { RepairsList } from '.';

const defaultProps = {
  user: { manager: true },
  loadRepairs: jest.fn(),
  history: { push: jest.fn() },
};

it('renders an empty list of repairs', () => {
  const wrapper = shallow(<RepairsList {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});

it("allows the user to add a repair if they're a manager", () => {
  const wrapper = shallow(<RepairsList {...defaultProps} user={{ manager: true }} />);
  expect(wrapper.find('EmptyRepairsList').prop('canAddRepairs')).toBe(true);
});

it("prevents the user from adding repair if they're not a manager", () => {
  const wrapper = shallow(<RepairsList {...defaultProps} user={{ manager: false }} />);
  expect(wrapper.find('EmptyRepairsList').prop('canAddRepairs')).toBe(false);
});

it('renders a list of repairs with content for a manager', () => {
  const repairs = [{ id: 1, title: 'Test repair 1' }, { id: 2, title: 'Test repair 2' }];
  const wrapper = shallow(
    <RepairsList {...defaultProps} repairs={repairs} user={{ manager: true }} />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('allows the manager to delete a repair from the list', () => {
  const repairs = [{ id: 1, title: 'Test repair 1' }];
  const wrapper = shallow(
    <RepairsList {...defaultProps} repairs={repairs} user={{ manager: true }} />,
  );
  expect(wrapper.find('RepairRow').prop('canDeleteRepair')).toBe(true);
});

it("doesn't allow a regular user to delete a repair from the list", () => {
  const repairs = [{ id: 1, title: 'Test repair 1' }];
  const wrapper = shallow(
    <RepairsList {...defaultProps} repairs={repairs} user={{ manager: false }} />,
  );
  expect(wrapper.find('RepairRow').prop('canDeleteRepair')).toBe(false);
});

it('renders a list of repairs with content for a regular user', () => {
  const repairs = [{ id: 1, title: 'Test repair 1' }, { id: 2, title: 'Test repair 2' }];
  const wrapper = shallow(
    <RepairsList {...defaultProps} repairs={repairs} user={{ manager: false }} />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('redirects to /repairs/add when adding a repair', () => {
  const historyPush = defaultProps.history.push;
  const wrapper = shallow(<RepairsList {...defaultProps} user={{ manager: true }} />);
  wrapper.find('EmptyRepairsList').prop('onAddRepair')();
  expect(historyPush).toHaveBeenCalledWith('/repairs/add');
});

describe('lifecycle callbacks', () => {
  describe('componentDidMount', () => {
    it('calls the loadRepairs prop', () => {
      const loadRepairs = defaultProps.loadRepairs;
      mount(<RepairsList {...defaultProps} />);
      expect(loadRepairs).toHaveBeenCalled();
    });
  });
});
