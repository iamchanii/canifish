import React from 'react';
import Select from './Select';

export default {
  title: 'atomics|Select',
  component: Select,
};

export const select = () => {
  return (
    <Select>
      <option value="nothern">북반구</option>
      <option value="southern">남반구</option>
    </Select>
  );
};
