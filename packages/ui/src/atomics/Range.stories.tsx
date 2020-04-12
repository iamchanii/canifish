import React from 'react';
import FormLabel from '../molecules/FormLabel';
import Range from './Range';

export default {
  title: 'atomics|Range',
  component: Range,
};

export const range = () => {
  const [values, setValues] = React.useState([1_000, 15_000]);

  return (
    <FormLabel htmlFor="name" label="판매 금액">
      <Range
        step={1000}
        min={0}
        max={15_000}
        values={values}
        onChange={setValues}
      />
    </FormLabel>
  );
};
