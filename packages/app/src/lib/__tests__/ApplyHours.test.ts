import { Chance } from 'chance';
import MockClock from '../../testing/mockClock';
import ApplyHours from '../ApplyHours';

const chance = new Chance();

describe('ApplyHours', () => {
  it('하루 종일은 어떤 값을 넣어도 true가 나온다.', () => {
    const applyHours = new ApplyHours([0, 23]);
    expect(applyHours.isApplyFromNow()).toBe(true);
  });
  function createTestCase(_applyHours: number[]) {
    return function (min: number, max: number, expected: boolean) {
      MockClock.setHours(chance.integer({ min, max }));
      const applyHours = new ApplyHours(_applyHours);
      expect(applyHours.isApplyFromNow()).toBe(expected);
    };
  }
  describe('오전 9시 ~ 오후 4시', () => {
    const testCase = createTestCase([9, 16]);
    it('0시 ~ 8시인 경우 false', () => {
      testCase(0, 8, false);
    });
    it('9시 ~ 16시인 경우 true', () => {
      testCase(9, 16, true);
    });
    it('17시 ~ 23시인 경우 false', () => {
      testCase(17, 23, false);
    });
  });
  describe('오후 4시 ~ 오후 9시', () => {
    const testCase = createTestCase([16, 21]);
    it('0시 ~ 15시인 경우 false', () => {
      testCase(0, 15, false);
    });
    it('16시 ~ 21시인 경우 true', () => {
      testCase(16, 21, true);
    });
    it('22시 ~ 23시인 경우 false', () => {
      testCase(22, 23, false);
    });
  });
  describe('오후 9시 ~ 오전 4시', () => {
    const testCase = createTestCase([21, 4]);
    it('0시 ~ 4시인 경우 true', () => {
      testCase(0, 4, true);
    });
    it('5시 ~ 20시인 경우 false', () => {
      testCase(5, 20, false);
    });
    it('21시 ~ 23시인 경우 true', () => {
      testCase(21, 23, true);
    });
  });
  describe('오전 4시 ~ 오전 9시', () => {
    const testCase = createTestCase([4, 9]);
    it('0시 ~ 3시인 경우 false', () => {
      testCase(0, 3, false);
    });
    it('4시 ~ 9시인 경우 true', () => {
      testCase(4, 9, true);
    });
    it('10시 ~ 23시인 경우 false', () => {
      testCase(10, 23, false);
    });
  });
});
