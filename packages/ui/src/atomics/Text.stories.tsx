import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Text, { TextColor, TextSize } from './Text';

export default {
  title: 'atomics|Text',
  component: Text,
  decorators: [withKnobs],
};

export const basic = () => {
  return <Text>Text</Text>;
};

export const colors = () => {
  return (
    <>
      <Text color={TextColor.GREEN}>Text</Text>
      <Text color={TextColor.LIGHT_BROWN}>Text</Text>
      <Text color={TextColor.WHITE}>Text</Text>
    </>
  );
};

export const sizes = () => {
  return (
    <>
      <Text size={TextSize.XSMALL}>XSMALL</Text>
      <Text size={TextSize.SMALL}>SMALL</Text>
      <Text size={TextSize.MEDIUM}>MEDIUM</Text>
      <Text size={TextSize.LARGE}>LARGE</Text>
    </>
  );
};
