import React from 'react';
import { shallow } from 'enzyme';

import HourPicker from '.';

it('marks the selected hour button', () => {
  const hour = 12;
  const wrapper = shallow(<HourPicker hour={hour} />);
  const selectedButton = wrapper.findWhere(el => el.is('button') && el.text().includes('*'));
  expect(selectedButton.text()).toEqual(`${hour}*`);
});

it('executes onHourChange with the selected hour when clicking a button', () => {
  const onHourChange = jest.fn();

  const hourToSelect = 13;
  const wrapper = shallow(<HourPicker hour={10} onHourChange={onHourChange} />);
  const button = wrapper.findWhere(el => el.is('button') && el.text() === hourToSelect.toString());

  button.simulate('click', { preventDefault: () => {} });
  expect(onHourChange).toHaveBeenCalledWith(hourToSelect);
});

it('disables hours that are less than the min prop', () => {
  const wrapper = shallow(<HourPicker hour={10} min={4} />);
  const button = wrapper.findWhere(el => el.is('button') && el.text() === '2');
  expect(button.prop('disabled')).toBe(true);
});

it('disables hours that are more than the max prop', () => {
  const wrapper = shallow(<HourPicker hour={10} max={18} />);
  const button = wrapper.findWhere(el => el.is('button') && el.text() === '20');
  expect(button.prop('disabled')).toBe(true);
});

it('disables hours that are included in the unavailable array', () => {
  const unavailableHour = 15;
  const wrapper = shallow(<HourPicker hour={10} unavailable={[unavailableHour]} />);
  const button = wrapper.findWhere(
    el => el.is('button') && el.text() === unavailableHour.toString(),
  );
  expect(button.prop('disabled')).toBe(true);
});
