/* @jsx jsx */

import { fishDatabase, Fish } from '@canifish/database';
import { FishCard, Text } from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import React, { FC, useState, useEffect, useMemo } from 'react';
import usePromise from '../../hooks/usePromise';
import media from 'css-in-js-media';

const style = css`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  ${media('>=desktop')} {
    max-width: 720px;
  }

  > li {
    flex: 0 0 calc(25% - 1rem);
    margin: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.125);

    ${media('<=tablet')} {
      flex: 0 0 calc(50% - 1rem);
    }
  }
`;

const FishList: FC = () => {
  const fishes = usePromise(fishDatabase.get);
  const [date, setDate] = useState<Date>(() => new Date());
  const currentMonth = date.getMonth();
  const currentHour = date.getHours();

  useEffect(() => {
    const onWindowFocus = () => {
      setDate(new Date());
    };

    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.addEventListener('focus', onWindowFocus);
    };
  }, []);

  const { now, etc } = useMemo(() => {
    return fishes.reduce<{ now: Fish[]; etc: Fish[] }>(
      (acc, fish) => {
        const {
          appearanceStartTime,
          appearanceEndTime,
          appearanceMonths,
        } = fish;

        if (
          appearanceMonths.includes(currentMonth) &&
          (appearanceStartTime <= currentHour ||
            currentHour < appearanceEndTime)
        ) {
          acc.now.push(fish);
        } else {
          acc.etc.push(fish);
        }

        return acc;
      },
      { now: [], etc: [] },
    );
  }, [fishes, currentHour, currentMonth]);

  return (
    <div>
      <Text variant="listTitle">지금 잡을수 있는 물고기</Text>
      <ul css={style}>
        {now.map((fish) => (
          <FishCard key={fish.id} name={fish.name} price={fish.price} />
        ))}
      </ul>
      <Text variant="listTitle">그 외 물고기</Text>
      <ul css={style}>
        {etc.map((fish) => (
          <FishCard key={fish.id} name={fish.name} price={fish.price} />
        ))}
      </ul>
    </div>
  );
};

export default FishList;
