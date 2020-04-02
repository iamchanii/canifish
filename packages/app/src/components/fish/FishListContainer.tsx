/* @jsx jsx */

import { Fish, fishDatabase } from '@canifish/database';
import { jsx } from '@emotion/core';
import React, { FC, useEffect, useMemo, useState } from 'react';
import usePromise from '../../hooks/usePromise';
import FishList from './FishList';

const FishListContainer: FC = () => {
  const fishes = usePromise(fishDatabase.get);
  const [date, setDate] = useState<Date>(() => new Date());
  const nowMonth = date.getMonth();
  const nowHours = date.getHours();

  useEffect(() => {
    const onWindowFocus = () => {
      setDate(new Date());
    };

    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.addEventListener('focus', onWindowFocus);
    };
  }, []);

  const { available, etc } = useMemo(
    () => reduceFishesFromNow(fishes, nowMonth, nowHours),
    [fishes, nowHours, nowMonth],
  );

  return (
    <div>
      <FishList fishes={available} listText="지금 잡을수 있는 물고기" />
      <FishList fishes={etc} listText="그 외 물고기" />
    </div>
  );
};

FishListContainer.displayName = 'FishListContainer';

export default FishListContainer;

interface ReduceFishesResult {
  available: Fish[];
  etc: Fish[];
}

const reduceFishesFromNow = (
  fishes: Fish[],
  nowMonth: number,
  nowHours: number,
): ReduceFishesResult => {
  return fishes.reduce<ReduceFishesResult>(
    (acc, fish) => {
      const { applyHours, applyMonths } = fish;
      const isAvailableNow =
        applyMonths.includes(nowMonth) &&
        isApplyTimeFromNow(applyHours, nowHours);

      acc[isAvailableNow ? 'available' : 'etc'].push(fish);

      return acc;
    },
    { available: [], etc: [] },
  );
};

const isApplyTimeFromNow = (
  applyHours: [number, number][],
  nowHours: number,
): boolean => {
  return applyHours.some(
    ([fromHours, endHours]) => fromHours <= nowHours || endHours > nowHours,
  );
};
