/** @jsx jsx */
import { Fish } from '@canifish/database';
import { FishCard, Text } from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import media from 'css-in-js-media';
import React from 'react';
import containerStyle from '../../styles/containerStyle';
import getApplyHoursText from './lib/getApplyHoursText';
import getPlaceText from './lib/getPlaceText';
import getShadowSizeText from './lib/getShadowSizeText';

export interface FishListProps {
  /** 물고기 데이터 배열 */
  fishes: Fish[];
  /** 목록 상단에 표시할 텍스트 */
  listText: string;
}

/**
 * 물고기 목록
 */
const FishList: React.FC<FishListProps> = React.memo(({ fishes, listText }) => {
  const getListItemByFish = (fish: Fish): React.ReactNode => {
    const {
      place,
      shadowSize,
      hasFin,
      hasSound,
      applyHours,
      onlyRaining,
    } = fish;
    const placeText = getPlaceText(place, { onlyRaining });
    const shadowSizeText = getShadowSizeText(shadowSize, {
      hasFin,
      hasSound,
    });
    const applyHoursText = getApplyHoursText(applyHours);

    return (
      <li key={fish.id}>
        <FishCard
          imageUrl={`/images/fishes/${fish.imageUrl}`}
          name={fish.name}
          price={fish.price}
          place={placeText}
          shadowSize={shadowSizeText}
          applyHours={applyHoursText}
          applyMonths={fish.applyMonths}
        />
      </li>
    );
  };

  return (
    <React.Fragment>
      <Text variant="listTitle">{listText}</Text>
      <ul css={style}>{fishes.map(getListItemByFish)}</ul>
    </React.Fragment>
  );
});

FishList.displayName = 'FishList';

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

export default FishList;
