import React from 'react';
import Button, { ButtonVariant } from './Button';

export default {
  title: 'atomics|Button',
  component: Button,
};

export const primary = () => {
  return <Button variant={ButtonVariant.PRIMARY}>버튼 텍스트</Button>;
};

export const disabled = () => {
  return (
    <Button disabled variant={ButtonVariant.PRIMARY}>
      버튼 텍스트
    </Button>
  );
};
