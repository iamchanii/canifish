/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import media from 'css-in-js-media';
import React from 'react';
import Fish from '../../lib/Fish';
import containerStyle from '../../styles/containerStyle';
import FishCard from '../organisms/FishCard';

export interface FishCardListProps {
  fishes: Fish[];
}

/**
 * 물고기 목록
 */
const FishCardList: React.FC<FishCardListProps> = React.memo(({ fishes }) => {
  const getListItemByFish = (fish: Fish): React.ReactNode => {
    return (
      <li key={fish.data.id}>
        <FishCard
          imageUrl={`/images/fishes/${fish.data.imageUrl}`}
          name={fish.data.name}
          price={fish.data.price}
          place={fish.place.toString()}
          shadowSize={fish.shadowSize.toString()}
          applyHours={fish.applyHours.toString()}
          applyMonths={fish.data.applyMonths}
        />
      </li>
    );
  };

  return <ul css={style}>{fishes.map(getListItemByFish)}</ul>;
});

FishCardList.displayName = 'FishCardList';

const style = css`
  margin: 0 auto 2rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  ${containerStyle};

  > li {
    padding: 0.5rem;
    flex: 0 0;

    ${media('>=largeDesktop')} {
      flex-basis: 25%;
    }

    ${media('<=largeDesktop', '>desktop')} {
      flex-basis: 33.3%;
    }

    ${media('<=desktop', '>tablet')} {
      flex-basis: 50%;
    }

    ${media('<=tablet')} {
      flex-basis: 100%;
    }
  }
`;

export default FishCardList;
