import React from 'react';
import { Select } from './Select';

export default {
  title: 'components|Select',
  component: Select,
};

const buttonVariantOptions: any = {
  Primary: 'primary',
};

export const select = () => {
  return (
    <Select>
      <option value="nothern">북반구</option>
      <option value="southern">남반구</option>
    </Select>
  );
};
