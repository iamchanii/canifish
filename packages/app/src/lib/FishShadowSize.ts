import text from '../constants/text';

export enum FishShadowSizeEnum {
  NARROW = 'narrow',
  XSMALL = 1,
  SMALL = 2,
  MEDIUM = 3,
  LARGE = 4,
  XLARGE = 5,
  XXLARGE = 6,
}

const shadowSizeTextMap: { [key in FishShadowSizeEnum]: string } = {
  narrow: text.SIZE_NARROW,
  1: text.SIZE_XSMALL,
  2: text.SIZE_SMALL,
  3: text.SIZE_MEDIUM,
  4: text.SIZE_LARGE,
  5: text.SIZE_XLARGE,
  6: text.SIZE_XXLARGE,
};

export default class FishShadowSize {
  private readonly shadowSize: FishShadowSizeEnum;
  private readonly hasFin: boolean;
  private readonly hasSound: boolean;

  constructor(
    shadowSize: FishShadowSizeEnum,
    hasFin: boolean,
    hasSound: boolean,
  ) {
    this.shadowSize = shadowSize;
    this.hasFin = hasFin;
    this.hasSound = hasSound;
  }

  isEqual(shadowSize: FishShadowSizeEnum): boolean {
    return this.shadowSize === shadowSize;
  }

  toString(): string {
    return [
      shadowSizeTextMap[this.shadowSize] +
        (typeof this.shadowSize === 'number' ? `(${this.shadowSize})` : ''),
      this.hasFin && text.HAS_FIN,
      this.hasSound && text.HAS_SOUND,
    ]
      .filter(Boolean)
      .join(', ');
  }
}
