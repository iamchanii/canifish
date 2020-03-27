import fishData, {
  parsePlaceText,
  parseAppearanceTimes,
  parseAppearanceMonths,
} from '../fishData';

describe('parsePlaceText', () => {
  it('강을 입력하면 river가 반환된다.', () => {
    expect(parsePlaceText('강')).toBe('river');
  });

  it('강(하구)를 입력하면 mouthOfRiver가 반환된다.', () => {
    expect(parsePlaceText('강(하구)')).toBe('mouthOfRiver');
  });

  it('강(절벽위)를 입력하면 riverOnCliff가 반환된다.', () => {
    expect(parsePlaceText('강(절벽위)')).toBe('riverOnCliff');
  });

  it('연못을 입력하면 pond가 반환된다.', () => {
    expect(parsePlaceText('연못')).toBe('pond');
  });

  it('바다를 입력하면 sea가 반환된다.', () => {
    expect(parsePlaceText('바다')).toBe('sea');
  });

  it('바다(부둣가)를 입력하면 seaAtDockside가 반환된다.', () => {
    expect(parsePlaceText('바다(부둣가)')).toBe('seaAtDockside');
  });

  it('그 외의 텍스트를 입력하면 예외가 발생한다.', () => {
    expect(() => parsePlaceText('너굴상점')).toThrow();
  });
});

describe('parseAppearanceTimes', () => {
  it('하루종일을 입력하면 [0, 23]을 반환한다.', () => {
    expect(parseAppearanceTimes('하루종일')).toEqual([0, 23]);
  });

  it('오전 9시 - 오후 4시를 입력하면 [9, 16]을 반환한다.', () => {
    expect(parseAppearanceTimes('오전 9시 - 오후 4시')).toEqual([9, 16]);
  });

  it('오전 4시 - 오후 9시를 입력하면 [4, 21]을 반환한다.', () => {
    expect(parseAppearanceTimes('오전 4시 - 오후 9시')).toEqual([4, 21]);
  });

  it('오후 9시 - 오전 4시를 입력하면 [21, 4]를 반환한다.', () => {
    expect(parseAppearanceTimes('오후 9시 - 오전 4시')).toEqual([21, 4]);
  });
});

describe('parseAppearanceMonths', () => {
  it('1월, 2월, 3월 데이터가 잘 파싱된다.', () => {
    expect(
      parseAppearanceMonths([
        '1',
        '2',
        '3',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]),
    ).toEqual([0, 1, 2]);
  });

  it('1월, 2월, 3월, 11월, 12월 데이터가 잘 파싱된다.', () => {
    expect(
      parseAppearanceMonths([
        '1',
        '2',
        '3',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '11',
        '12',
      ]),
    ).toEqual([0, 1, 2, 10, 11]);
  });

  it('5월, 6월, 7월, 8월 데이터가 잘 파싱된다.', () => {
    expect(
      parseAppearanceMonths([
        '',
        '',
        '',
        '',
        '5',
        '6',
        '7',
        '8',
        '',
        '',
        '',
        '',
      ]),
    ).toEqual([4, 5, 6, 7]);
  });
});

describe('fishData', () => {
  it('스냅샷 체크', () => {
    expect(fishData).toMatchSnapshot('fishData Snapshot');
  });
});