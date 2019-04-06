/**
 * @format
 */

import React from 'react';
import { shallow } from 'enzyme';

import App from '../index';
import Player from '../src/components/Player';

it('renders correctly', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(<Player />).exists()).toBe(true);
});
