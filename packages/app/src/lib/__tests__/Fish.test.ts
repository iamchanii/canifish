import { Chance } from 'chance';
import text from '../../constants/text';
import { Hemisphere } from '../../interface';
import createFishData from '../../testing/createFishData';
import MockClock from '../../testing/mockClock';
import Fish, {
  ApplyHours,
  ApplyMonths,
  FishData,
  FishPlace,
  FishShadowSize,
} from '../Fish';

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

  describe('isShadowSizeEqual', () => {
    it('그림자 크기가 일치하면 true', () => {
      fishData.shadowSize = FishShadowSize.NARROW;
      const fish = new Fish(fishData);

      expect(fish.isShadowSizeEqual(FishShadowSize.NARROW)).toBe(true);
    });

    it('그림자 크기가 일치하지 않으면 false', () => {
      fishData.shadowSize = FishShadowSize.NARROW;
      const fish = new Fish(fishData);

      expect(fish.isShadowSizeEqual(FishShadowSize.XLARGE)).toBe(false);
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

  describe('isPlaceIncludes', () => {
    it('특정 장소를 포함하면 true', () => {
      const fish = new Fish(fishData);

      expect(fish.isPlaceIncludes(fishData.place[0])).toBe(true);
    });

    it('특정 장소를 포함하지 않으면 false', () => {
      fishData.place = [];
      const fish = new Fish(fishData);

      expect(fish.isPlaceIncludes(FishPlace.RIVER)).toBe(false);
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

  describe('placeText', () => {
    it('river인 경우 text.PLACE_RIVER을 반환한다.', () => {
      fishData.place = [FishPlace.RIVER];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_RIVER);
    });

    it('mouth인 경우 text.PLACE_MOUTH을 반환한다.', () => {
      fishData.place = [FishPlace.MOUTH];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_MOUTH);
    });

    it('clifftop인 경우 text.PLACE_CLIFFTOP을 반환한다.', () => {
      fishData.place = [FishPlace.CLIFFTOP];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_CLIFFTOP);
    });

    it('pond인 경우 text.PLACE_POND을 반환한다.', () => {
      fishData.place = [FishPlace.POND];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_POND);
    });

    it('ocean인 경우 text.PLACE_OCEAN을 반환한다.', () => {
      fishData.place = [FishPlace.OCEAN];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_OCEAN);
    });

    it('pier인 경우 text.PLACE_PIER을 반환한다.', () => {
      fishData.place = [FishPlace.PIER];
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.PLACE_PIER);
    });

    it('onlyRaining 옵션을 전달하면 비 또는 눈이 포함되어 반환된다.', () => {
      fishData.place = chance.pickset([
        FishPlace.CLIFFTOP,
        FishPlace.MOUTH,
        FishPlace.OCEAN,
        FishPlace.PIER,
        FishPlace.POND,
        FishPlace.RIVER,
      ]);
      fishData.onlyRaining = true;
      const fish = new Fish(fishData);

      expect(fish.placeText).toContain(text.ONLY_RAINING);
    });
  });
});
