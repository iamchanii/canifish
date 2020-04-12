import { Hemisphere } from '../../interface';
import groupFishesByNow from '../groupFishesByNow';
import createFishData from '../createFishData';

const createFishes = (count: number = 5) =>
  [...Array(count)].map(createFishData);

test('현재 시간을 기준으로 잡을 수 있는 물고기와 아닌 물고기를 그룹화 한다.', () => {
  const fishes = createFishes();
  fishes[0].applyHours = [[17, 19]];
  fishes[0].applyMonths = [3];

  const { available, etc } = groupFishesByNow(
    fishes,
    3,
    18,
    Hemisphere.NORTHERN,
  );

  expect(available).toContainEqual(fishes[0]);
  expect(etc).not.toContainEqual(fishes[0]);
});

test('남반구인 경우 그룹화 된 물고기의 출현 기간이 6개월씩 조정되어 있다.', () => {
  const fishes = createFishes(1);
  fishes[0].applyHours = [[17, 19]];
  fishes[0].applyMonths = [3, 4, 5];

  const { available } = groupFishesByNow(fishes, 9, 18, Hemisphere.SOUTHERN);

  expect(available[0].applyMonths).toEqual([9, 10, 11]);
});
