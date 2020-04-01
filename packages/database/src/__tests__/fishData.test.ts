import { parseShadowSize } from './../fishData';
import fishData, {
  parsePlaceText,
  parseApplyHours,
  parseApplyMonths,
} from '../fishData';

describe('parsePlaceText', () => {
  it('강을 입력하면 river가 반환된다.', () => {
    expect(parsePlaceText('강')).toContain('river');
  });

  it('강(하구)를 입력하면 mouthOfRiver가 반환된다.', () => {
    expect(parsePlaceText('강(하구)')).toContain('mouth');
  });

  it('강(절벽위)를 입력하면 riverOnCliff가 반환된다.', () => {
    expect(parsePlaceText('강(절벽위)')).toContain('clifftop');
  });

  it('연못을 입력하면 pond가 반환된다.', () => {
    expect(parsePlaceText('연못')).toContain('pond');
  });

  it('바다를 입력하면 sea가 반환된다.', () => {
    expect(parsePlaceText('바다')).toContain('ocean');
  });

  it('바다(부둣가)를 입력하면 seaAtDockside가 반환된다.', () => {
    expect(parsePlaceText('바다(부둣가)')).toContain('pier');
  });

  it('그 외의 텍스트를 입력하면 예외가 발생한다.', () => {
    expect(() => parsePlaceText('너굴상점')).toThrow();
  });
});

describe('parseAppearanceTimes', () => {
  it('하루종일을 입력하면 [0, 23]을 반환한다.', () => {
    expect(parseApplyHours('하루종일')).toContainEqual([0, 23]);
  });

  it('오전 9시 - 오후 4시를 입력하면 [9, 16]을 반환한다.', () => {
    expect(parseApplyHours('오전 9시 - 오후 4시')).toContainEqual([9, 16]);
  });

  it('오전 4시 - 오후 9시를 입력하면 [4, 21]을 반환한다.', () => {
    expect(parseApplyHours('오전 4시 - 오후 9시')).toContainEqual([4, 21]);
  });

  it('오후 9시 - 오전 4시를 입력하면 [21, 4]를 반환한다.', () => {
    expect(parseApplyHours('오후 9시 - 오전 4시')).toContainEqual([21, 4]);
  });
});

describe('parseAppearanceMonths', () => {
  it('1월, 2월, 3월 데이터가 잘 파싱된다.', () => {
    expect(
      parseApplyMonths(['1', '2', '3', '', '', '', '', '', '', '', '', '']),
    ).toEqual([0, 1, 2]);
  });

  it('1월, 2월, 3월, 11월, 12월 데이터가 잘 파싱된다.', () => {
    expect(
      parseApplyMonths(['1', '2', '3', '', '', '', '', '', '', '', '11', '12']),
    ).toEqual([0, 1, 2, 10, 11]);
  });

  it('5월, 6월, 7월, 8월 데이터가 잘 파싱된다.', () => {
    expect(
      parseApplyMonths(['', '', '', '', '5', '6', '7', '8', '', '', '', '']),
    ).toEqual([4, 5, 6, 7]);
  });
});

describe('parseShadowSize', () => {
  it('숫자로만 되어있는 경우 숫자를 그대로 반환한다.', () => {
    expect(parseShadowSize('1')).toHaveProperty('shadowSize', 1);
    expect(parseShadowSize('2')).toHaveProperty('shadowSize', 2);
    expect(parseShadowSize('3')).toHaveProperty('shadowSize', 3);
    expect(parseShadowSize('4')).toHaveProperty('shadowSize', 4);
    expect(parseShadowSize('5')).toHaveProperty('shadowSize', 5);
    expect(parseShadowSize('6')).toHaveProperty('shadowSize', 6);
  });

  it('길다는 표현이 있으면 narrow를 반환한다.', () => {
    expect(parseShadowSize('굵고 김')).toHaveProperty('shadowSize', 'narrow');
    expect(parseShadowSize('가늘고 김')).toHaveProperty('shadowSize', 'narrow');
    expect(parseShadowSize('어쨌든 김')).toHaveProperty('shadowSize', 'narrow');
  });

  it('지느러미가 있으면 지느러미 여부를 같이 반환함.', () => {
    expect(parseShadowSize('1 (지느러미)')).toHaveProperty('hasFin', true);
    expect(parseShadowSize('2 (지느러미)')).toHaveProperty('hasFin', true);
    expect(parseShadowSize('3 (지느러미)')).toHaveProperty('hasFin', true);
    expect(parseShadowSize('4')).toHaveProperty('hasFin', false);
    expect(parseShadowSize('5')).toHaveProperty('hasFin', false);
    expect(parseShadowSize('6')).toHaveProperty('hasFin', false);
  });

  it('울음소리가 있으면 울음소리 여부를 같이 반환함.', () => {
    expect(parseShadowSize('1 (울음소리)')).toHaveProperty('hasSound', true);
    expect(parseShadowSize('2 (울음소리)')).toHaveProperty('hasSound', true);
    expect(parseShadowSize('3 (울음소리)')).toHaveProperty('hasSound', true);
    expect(parseShadowSize('4')).toHaveProperty('hasSound', false);
    expect(parseShadowSize('5')).toHaveProperty('hasSound', false);
    expect(parseShadowSize('6')).toHaveProperty('hasSound', false);
  });
});

describe('fishData', () => {
  it('스냅샷 체크', () => {
    expect(fishData).toMatchSnapshot('fishData Snapshot');
  });
});
