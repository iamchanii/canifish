import { Chance } from 'chance';
import { FishData, FishPlace, FishShadowSize } from './Fish';

/**
 * 테스트 용으로 사용
 */
const createFishData = (): FishData => {
  const chance = new Chance();
  const applyHours = [[chance.hour(), chance.hour()]];
  const applyMonths = chance.pickset(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    chance.integer({ min: 1, max: 12 }),
  );
  const place = chance.pickset([
    FishPlace.CLIFFTOP,
    FishPlace.MOUTH,
    FishPlace.OCEAN,
    FishPlace.PIER,
    FishPlace.POND,
    FishPlace.RIVER,
  ]);
  const shadowSize = chance.pickone([
    FishShadowSize.NARROW,
    FishShadowSize.XSMALL,
    FishShadowSize.SMALL,
    FishShadowSize.MEDIUM,
    FishShadowSize.LARGE,
    FishShadowSize.XLARGE,
    FishShadowSize.XXLARGE,
  ]);

  return {
    id: chance.integer({ min: 1, max: 99999 }),
    name: chance.name(),
    applyHours,
    applyMonths,
    hasFin: chance.bool(),
    hasSound: chance.bool(),
    imageUrl: 'image.png',
    onlyRaining: chance.bool({ likelihood: 25 }),
    place,
    price: chance.integer({ min: 300, max: 15000 }),
    shadowSize,
  };
};

export default createFishData;