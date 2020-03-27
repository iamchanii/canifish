import React from 'react';
import { FishCard } from './FishCard';
import { withKnobs, text, number } from '@storybook/addon-knobs';

export default {
  title: 'components|FishCard',
  component: FishCard,
  decorators: [withKnobs],
};

export const fishCard = () => {
  const name = text('Name', '농어');
  const price = number('Price', 10000);

  return <FishCard name={name} price={price} />;
};
