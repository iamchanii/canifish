/* @jsx jsx */
import { Fish, FishPlace, FishShadowSize } from '@canifish/database';
import { FishCard, Text } from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import media, { getBreakPoints } from 'css-in-js-media';
import React from 'react';
import text from '../../constants/text';
import containerStyle from '../../styles/containerStyle';

export interface FishListProps {
  fishes: Fish[];
  listText: string;
}

const FishList: React.FC<FishListProps> = React.memo(({ fishes, listText }) => {
  return (
    <React.Fragment>
      <Text variant="listTitle">{listText}</Text>
      <ul css={style}>
        {fishes.map((fish) => {
          const {
            id,
            name,
            price,
            place,
            shadowSize,
            hasFin,
            hasSound,
            applyHours,
            imageUrl,
            onlyRaining,
            applyMonths,
          } = fish;
          const placeText = getPlaceText(place, { onlyRaining });
          const shadowSizeText = getShadowSizeText(shadowSize, {
            hasFin,
            hasSound,
          });
          const applyHoursText = getApplyHoursText(applyHours);

          return (
            <li key={id}>
              <FishCard
                imageUrl={`/images/fishes/${imageUrl}`}
                name={name}
                price={price}
                place={placeText}
                shadowSize={shadowSizeText}
                applyHours={applyHoursText}
                applyMonths={applyMonths}
              />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
});

FishList.displayName = 'FishList';

const placeTextMap: { [key in FishPlace]: string } = {
  river: text.PLACE_RIVER,
  mouth: text.PLACE_MOUTH,
  clifftop: text.PLACE_CLIFFTOP,
  pond: text.PLACE_POND,
  ocean: text.PLACE_OCEAN,
  pier: text.PLACE_PIER,
};

export const getPlaceText = (
  fishPlaces: FishPlace[],
  { onlyRaining }: { onlyRaining: boolean },
): string => {
  return [
    ...fishPlaces.map((place) => placeTextMap[place]),
    onlyRaining && text.ONLY_RAINING,
  ]
    .filter(Boolean)
    .join(', ');
};

const shadowSizeTextMap: { [key in FishShadowSize]: string } = {
  narrow: text.SIZE_NARROW,
  1: text.SIZE_XSMALL,
  2: text.SIZE_SMALL,
  3: text.SIZE_MEDIUM,
  4: text.SIZE_LARGE,
  5: text.SIZE_XLARGE,
  6: text.SIZE_XXLARGE,
};

export const getShadowSizeText = (
  shadowSize: FishShadowSize,
  { hasFin, hasSound }: { hasFin: boolean; hasSound: boolean },
): string => {
  return [
    shadowSizeTextMap[shadowSize] +
      (typeof shadowSize === 'number' ? `(${shadowSize})` : ''),
    hasFin && text.HAS_FIN,
    hasSound && text.HAS_SOUND,
  ]
    .filter(Boolean)
    .join(', ');
};

export const getApplyHoursText = (applyHours: [number, number][]) => {
  return applyHours
    .map((hours) => {
      if (isAllDay(hours)) {
        return text.ALL_DAY;
      }

      return hours.map((hour) => `${hour}시`).join(' ~ ');
    })
    .join(', ');
};

const isAllDay = (hours: [number, number]) => hours[0] === 0 && hours[1] === 23;

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
