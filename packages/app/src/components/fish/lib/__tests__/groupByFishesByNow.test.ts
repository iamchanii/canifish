import { Fish, FishPlace, FishShadowSize } from '@canifish/database';
import { Chance } from 'chance';
import groupFishesByNow from '../groupFishesByNow';

const chance = new Chance();

const createFish = (): Fish => {
  const applyHours = [[chance.hour(), chance.hour()]];
  const applyMonths = chance.pickset(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    chance.integer({ min: 1, max: 12 }),
  );
  const place = chance.pickset<FishPlace>([
    'river',
    'pond',
    'pier',
    'ocean',
    'mouth',
    'clifftop',
  ]);
  const shadowSize = chance.pickone<FishShadowSize>([
    'narrow',
    1,
    2,
    3,
    4,
    5,
    6,
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

const createFishes = (count: number = 5) => [...Array(count)].map(createFish);

test('현재 시간을 기준으로 잡을 수 있는 물고기와 아닌 물고기를 그룹화 한다.', () => {
  const fishes = createFishes();
  fishes[0].applyHours = [[17, 19]];
  fishes[0].applyMonths = [3];

  const { available, etc } = groupFishesByNow(fishes, 3, 18, 'northern');

  expect(available).toContainEqual(fishes[0]);
  expect(etc).not.toContainEqual(fishes[0]);
});

test('남반구인 경우 그룹화 된 물고기의 출현 기간이 6개월씩 조정되어 있다.', () => {
  const fishes = createFishes(1);
  fishes[0].applyHours = [[17, 19]];
  fishes[0].applyMonths = [3, 4, 5];

  const { available } = groupFishesByNow(fishes, 9, 18, 'southern');

  expect(available[0].applyMonths).toEqual([9, 10, 11]);
});
