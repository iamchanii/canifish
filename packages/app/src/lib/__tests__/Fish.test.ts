import { Chance } from 'chance';
import text from '../../constants/text';
import { Hemisphere } from '../../interface';
import createFishData from '../../testing/createFishData';
import MockClock from '../../testing/mockClock';
import Fish, { FishData } from '../Fish';
import FishShadowSizeEnum from '../FishShadowSize';

const chance = new Chance();

describe('Fish', () => {
  let fishData: FishData;

  beforeEach(() => {
    fishData = createFishData();
  });

  describe('hasSound', () => {
    it('true', () => {
      fishData.hasSound = true;
      const fish = new Fish(fishData);

      expect(fish.hasSound).toBe(true);
    });

    it('false', () => {
      fishData.hasSound = false;
      const fish = new Fish(fishData);

      expect(fish.hasSound).toBe(false);
    });
  });

  describe('hasFin', () => {
    it('true', () => {
      fishData.hasFin = true;
      const fish = new Fish(fishData);

      expect(fish.hasFin).toBe(true);
    });

    it('false', () => {
      fishData.hasFin = false;
      const fish = new Fish(fishData);

      expect(fish.hasFin).toBe(false);
    });
  });

  describe('isPriceIncludeIn', () => {
    it('물고기 금액이 특정 범위 이내에 포함되면 true', () => {
      fishData.price = 10_000;
      const fish = new Fish(fishData);

      expect(fish.isPriceIncludeIn([5_000, 15_000])).toBe(true);
    });

    it('물고기 금액이 특정 범위 이내에 포함되지 않으면 false', () => {
      fishData.price = Infinity;
      const fish = new Fish(fishData);

      expect(fish.isPriceIncludeIn([0, 15_000])).toBe(false);
    });
  });

  describe('isApplyMonths', () => {
    it('특정 월에 포함되면 true', () => {
      const fish = new Fish(fishData);

      expect(fish.isApplyMonths(fishData.applyMonths[0])).toBe(true);
    });

    it('특정 월에 포함되지 않으면 false', () => {
      const fish = new Fish(fishData);

      expect(fish.isApplyMonths(13)).toBe(false);
    });

    it('남반구인 경우 6개월 더한 월이 포함되는 경우 true', () => {
      fishData.applyMonths = [0, 1, 2];
      const fish = new Fish(fishData);

      expect(fish.isApplyMonths(6, Hemisphere.SOUTHERN)).toBe(true);
    });

    it('남반구인 경우 6개월 더한 월이 포함되지 않는 경우 false', () => {
      fishData.applyMonths = [0, 1, 2];
      const fish = new Fish(fishData);

      expect(fish.isApplyMonths(0, Hemisphere.SOUTHERN)).toBe(false);
    });
  });

  describe('isApplyNow', () => {
    it('지금 출현하는 물고기인 경우 true', () => {
      const fish = new Fish(fishData);
      MockClock.setHours(fishData.applyHours[0][0]);
      MockClock.setMonths(fishData.applyMonths[0]);

      expect(fish.isApplyNow()).toBe(true);
    });

    it('지금 출현하는 물고기가 아니면 false', () => {
      fishData.applyMonths = [0, 1, 2];
      fishData.applyHours = [
        [1, 4],
        [13, 16],
      ];
      const fish = new Fish(fishData);

      MockClock.setMonths(3);
      MockClock.setHours(0);
      expect(fish.isApplyNow()).toBe(false);

      MockClock.setMonths(0);
      MockClock.setHours(0);
      expect(fish.isApplyNow()).toBe(false);
    });
  });

  it('name', () => {
    const fish = new Fish(fishData);

    expect(fish.name).toBe(fishData.name);
  });
});
