import text from '../constants/text';
import { Hemisphere } from './../interface';
import ApplyHours from './ApplyHours';
import ApplyMonths from './ApplyMonths';
import Clock from './Clock';
import FishPlace, { FishPlaceEnum } from './FishPlace';
import FishShadowSize from './FishShadowSize';

export interface FishData {
  id: number;
  name: string;
  price: number;
  place: FishPlaceEnum[];
  shadowSize: FishShadowSize;
  hasFin: boolean;
  hasSound: boolean;
  onlyRaining: boolean;
  applyHours: number[][];
  applyMonths: number[];
  imageUrl: string;
}

const shadowSizeTextMap: { [key in FishShadowSize]: string } = {
  narrow: text.SIZE_NARROW,
  1: text.SIZE_XSMALL,
  2: text.SIZE_SMALL,
  3: text.SIZE_MEDIUM,
  4: text.SIZE_LARGE,
  5: text.SIZE_XLARGE,
  6: text.SIZE_XXLARGE,
};

export default class Fish {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  readonly _data: FishData;
  readonly _applyMonths: ApplyMonths;
  readonly _applyHours: ApplyHours[];
  readonly place: FishPlace;

  constructor(data: FishData) {
    this._data = data;
    this._applyMonths = new ApplyMonths(data.applyMonths);
    this._applyHours = data.applyHours.map((hours) => new ApplyHours(hours));
    this.place = new FishPlace(data.place, data.onlyRaining);
  }

  get data(): FishData {
    return this._data;
  }

  get hasSound(): boolean {
    return this.data.hasSound;
  }

  get hasFin(): boolean {
    return this.data.hasFin;
  }

  get name(): string {
    return this.data.name;
  }

  get shadowSizeText(): string {
    return [
      shadowSizeTextMap[this.data.shadowSize] +
        (typeof this.data.shadowSize === 'number'
          ? `(${this.data.shadowSize})`
          : ''),
      this.hasFin && text.HAS_FIN,
      this.hasSound && text.HAS_SOUND,
    ]
      .filter(Boolean)
      .join(', ');
  }

  getApplyMonthsData(hemisphere: Hemisphere = Hemisphere.NORTHERN): number[] {
    return this._applyMonths.getData(hemisphere);
  }

  isShadowSizeEqual(shadowSize: FishShadowSize): boolean {
    return this.data.shadowSize === shadowSize;
  }

  isPriceIncludeIn(priceRange: number[]): boolean {
    const [minPrice, maxPrice] = priceRange;

    return minPrice <= this.data.price && this.data.price <= maxPrice;
  }

  isApplyMonths(
    targetMonth: number,
    hemisphere: Hemisphere = Hemisphere.NORTHERN,
  ): boolean {
    return this._applyMonths.isApply(targetMonth, hemisphere);
  }

  isApplyNow(hemisphere: Hemisphere = Hemisphere.NORTHERN): boolean {
    return (
      this.isApplyMonths(Clock.nowMonth, hemisphere) &&
      this._applyHours.some((hours) => hours.isApplyFromNow())
    );
  }
}
