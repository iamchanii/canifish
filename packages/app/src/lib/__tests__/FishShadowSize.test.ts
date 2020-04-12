import text from '../../constants/text';
import FishShadowSize, { FishShadowSizeEnum } from '../FishShadowSize';

describe('isEqual', () => {
  it('그림자 크기가 일치하면 true', () => {
    const fishShadowSize = new FishShadowSize(
      FishShadowSizeEnum.NARROW,
      false,
      false,
    );

    expect(fishShadowSize.isEqual(FishShadowSizeEnum.NARROW)).toBe(true);
  });

  it('그림자 크기가 일치하지 않으면 false', () => {
    const fishShadowSize = new FishShadowSize(
      FishShadowSizeEnum.NARROW,
      false,
      false,
    );

    expect(fishShadowSize.isEqual(FishShadowSizeEnum.XLARGE)).toBe(false);
  });
});

describe('toString', () => {
  it.each<[FishShadowSizeEnum, string]>([
    [FishShadowSizeEnum.NARROW, text.SIZE_NARROW],
    [1, text.SIZE_XSMALL + '(1)'],
    [2, text.SIZE_SMALL + '(2)'],
    [3, text.SIZE_MEDIUM + '(3)'],
    [4, text.SIZE_LARGE + '(4)'],
    [5, text.SIZE_XLARGE + '(5)'],
    [6, text.SIZE_XXLARGE + '(6)'],
  ])('%s를 넣으면 %s를 반환한다.', (size, text) => {
    const fishShadowSize = new FishShadowSize(size, false, false);

    expect(fishShadowSize.toString()).toContain(text);
  });

  it('hasFin', () => {
    const fishShadowSize = new FishShadowSize(1, true, false);

    expect(fishShadowSize.toString()).toContain(text.HAS_FIN);
  });

  it('hasSound.', () => {
    const fishShadowSize = new FishShadowSize(2, false, true);

    expect(fishShadowSize.toString()).toContain(text.HAS_SOUND);
  });
});
