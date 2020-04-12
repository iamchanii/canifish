import { Hemisphere } from '../../interface';
import createFishData from '../../testing/createFishData';
import MockClock from '../../testing/mockClock';
import Fish from '../Fish';
import groupFishesByNow from '../groupFishesByNow';

const createFishDataList = (count: number = 5) =>
  [...Array(count)].map(createFishData);

test('현재 시간을 기준으로 잡을 수 있는 물고기와 아닌 물고기를 그룹화 한다.', () => {
  MockClock.setMonths(3);
  MockClock.setHours(18);

  const fishes = createFishDataList().map((fishData, index) => {
    if (index === 0) {
      fishData.applyHours = [[17, 19]];
      fishData.applyMonths = [3];
    }

    return new Fish(fishData);
  });

  const { available, etc } = groupFishesByNow(fishes, Hemisphere.NORTHERN);

  expect(available).toContainEqual(fishes[0]);
  expect(etc).not.toContainEqual(fishes[0]);
});

test('남반구인 경우 그룹화 된 물고기의 출현 기간이 6개월씩 조정되어 있다.', () => {
  MockClock.setMonths(9);
  MockClock.setHours(18);

  const fishes = createFishDataList(1).map((fishData) => {
    fishData.applyHours = [[17, 19]];
    fishData.applyMonths = [3, 4, 5];

    return new Fish(fishData);
  });

  const { available } = groupFishesByNow(fishes, Hemisphere.SOUTHERN);

  expect(available[0]).toBe(fishes[0]);
});
