import React from 'react';
import ApplyMonths from './ApplyMonths';

export default {
  title: 'molecules|ApplyMonths',
  component: ApplyMonths,
};

const applyMonthsList = [2, 3, 4, 8, 9, 10];

export const applyMonths = () => <ApplyMonths applyMonths={applyMonthsList} />;
