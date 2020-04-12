import { Chance } from 'chance';
import { Hemisphere } from '../../interface';
import { ApplyMonths } from '../ApplyMonths';

const chance = new Chance();

describe('ApplyMonths', () => {
  let data: number[];

  beforeEach(() => {
    data = chance.n(chance.integer, chance.integer({ min: 1, max: 12 }), {
      min: 1,
      max: 12,
    });
  });

  describe('getData', () => {
    it('북반구는 입력한 그대로 반환됨.', () => {
      const applyMonths = new ApplyMonths(data);
      expect(applyMonths.getData(Hemisphere.NORTHERN)).toEqual(data);
    });

    it('남반구는 6개월씩 조정되어서 반환됨.', () => {
      const applyMonths = new ApplyMonths(data);
      expect(applyMonths.getData(Hemisphere.SOUTHERN)).toEqual(
        data.map((d) => (d + 6) % 12),
      );
    });
  });

  describe('isApply', () => {
    it('출현 기간 내에 포함되어 있는 값은 True', () => {
      const applyMonths = new ApplyMonths([0, 1, 2]);
      expect(applyMonths.isApply(0, Hemisphere.NORTHERN)).toBe(true);
    });

    it('출현 기간 내에 포함되어 있지 않은 값은 False', () => {
      const applyMonths = new ApplyMonths([0, 1, 2]);
      expect(applyMonths.isApply(4, Hemisphere.NORTHERN)).toBe(false);
    });

    it('남반구로 확인하는 경우 6개월 조정된 값으로 확인해야 함.', () => {
      const applyMonths = new ApplyMonths([0, 1, 2]);
      expect(applyMonths.isApply(0, Hemisphere.SOUTHERN)).toBe(false);
      expect(applyMonths.isApply(6, Hemisphere.SOUTHERN)).toBe(true);
    });
  });
});
