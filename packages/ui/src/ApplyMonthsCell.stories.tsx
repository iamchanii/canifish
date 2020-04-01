import React from 'react';
import { ApplyMonthsCell } from './ApplyMonthsCell';

export default {
  title: 'components|ApplyMonthsCell',
  component: ApplyMonthsCell,
};

export const applyMonthsCell = () => (
  <React.Fragment>
    <ApplyMonthsCell>1</ApplyMonthsCell>
    <ApplyMonthsCell>2</ApplyMonthsCell>
    <ApplyMonthsCell variant="active">3</ApplyMonthsCell>
    <ApplyMonthsCell variant="active">4</ApplyMonthsCell>
    <ApplyMonthsCell variant="active">5</ApplyMonthsCell>
    <ApplyMonthsCell>6</ApplyMonthsCell>
  </React.Fragment>
);
