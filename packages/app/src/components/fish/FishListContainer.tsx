/* @jsx jsx */

import { Fish, fishDatabase } from '@canifish/database';
import { jsx, css } from '@emotion/core';
import React, { FC, useEffect, useMemo, useState } from 'react';
import usePromise from '../../hooks/usePromise';
import FishList from './FishList';
import { Select } from '@canifish/ui';
import text from '../../constants/text';
import containerStyle from '../../styles/containerStyle';

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

  const [hemisphere, setHemisphere] = useState<'northern' | 'southern'>(
    'northern',
  );

  const { available, etc } = useMemo(
    () => reduceFishesFromNow(fishes, nowMonth, nowHours, hemisphere),
    [fishes, nowHours, nowMonth, hemisphere],
  );

  return (
    <div>
      <div css={[containerStyle, filterStyle]}>
        <Select
          defaultValue={hemisphere}
          onChange={(e) => setHemisphere(e.target.value as any)}
        >
          <option value="northern">{text.NORTHERN}</option>
          <option value="southern">{text.SOUTHERN}</option>
        </Select>
      </div>

      <FishList fishes={available} listText="지금 잡을수 있는 물고기" />
      <FishList fishes={etc} listText="그 외 물고기" />
    </div>
  );
};

FishListContainer.displayName = 'FishListContainer';

export default FishListContainer;

const filterStyle = css`
  padding: 0.5rem;
`;

interface ReduceFishesResult {
  available: Fish[];
  etc: Fish[];
}

const reduceFishesFromNow = (
  fishes: Fish[],
  nowMonth: number,
  nowHours: number,
  hemisphere: 'northern' | 'southern',
): ReduceFishesResult => {
  return fishes.reduce<ReduceFishesResult>(
    (acc, fish) => {
      const { applyHours } = fish;
      const applyMonths =
        hemisphere === 'southern'
          ? fish.applyMonths.map((month) => (month + 6) % 12)
          : fish.applyMonths;

      const isAvailableNow =
        applyMonths.includes(nowMonth) &&
        isApplyTimeFromNow(applyHours, nowHours);

      acc[isAvailableNow ? 'available' : 'etc'].push({
        ...fish,
        applyMonths,
      });

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
