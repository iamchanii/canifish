import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Text } from './Text';

export default {
  title: 'components|Text',
  component: Text,
  decorators: [withKnobs],
};

export const text = () => {
  return <Text variant="listTitle">Text</Text>;
};
