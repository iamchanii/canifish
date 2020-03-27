import React from 'react';
import { Button, ButtonVariants } from './Button';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components|Buttons',
  component: Button,
  decorators: [withKnobs],
};

const buttonVariantOptions: any = {
  Primary: 'primary',
};

export const primary = () => {
  const variant = select<ButtonVariants>(
    'variant',
    buttonVariantOptions,
    'primary',
  );
  const disabled = boolean('disabled', false);
  const onClick = action('onClick');

  return (
    <Button variant={variant} disabled={disabled} onClick={onClick}>
      버튼 텍스트
    </Button>
  );
};
