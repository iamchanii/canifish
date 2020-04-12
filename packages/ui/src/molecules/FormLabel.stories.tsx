import React from 'react';
import FormLabel from './FormLabel';

export default {
  title: 'molecules|FormLabel',
  component: FormLabel,
};

export const formLabel = () => {
  return (
    <>
      <FormLabel htmlFor="name" label="판매 금액">
        <input id="name" type="text" />
      </FormLabel>
      <FormLabel htmlFor="name2" label="출현 장소"></FormLabel>
      <FormLabel htmlFor="name3" label="그림자 크기">
        <input id="name3" type="text" />
      </FormLabel>
      <FormLabel htmlFor="name4" label="출현 기간">
        <input id="name4" type="text" />
      </FormLabel>
    </>
  );
};
