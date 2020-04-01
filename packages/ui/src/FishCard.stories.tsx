import React from 'react';
import { FishCard } from './FishCard';

export default {
  title: 'components|FishCard',
  component: FishCard,
};

const applyMonths = [2, 3, 4];

export const fishCard = () => {
  return (
    <FishCard
      name="농어"
      price={15000}
      applyHours="하루종일 나타나요."
      place="연못, 강 (절벽위)"
      shadowSize="가장 큼(6), 지느러미"
      applyMonths={applyMonths}
    />
  );
};
