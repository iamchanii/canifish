import { Hemisphere } from './../interface';
import ApplyHours from './ApplyHours';
import ApplyMonths from './ApplyMonths';
import Clock from './Clock';
import FishPlace, { FishPlaceEnum } from './FishPlace';
import FishShadowSize, { FishShadowSizeEnum } from './FishShadowSize';

export interface FishData {
  id: number;
  name: string;
  price: number;
  place: FishPlaceEnum[];
  shadowSize: FishShadowSizeEnum;
  hasFin: boolean;
  hasSound: boolean;
  onlyRaining: boolean;
  applyHours: number[][];
  applyMonths: number[];
  imageUrl: string;
}

export default class Fish {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  readonly _data: FishData;
  readonly _applyMonths: ApplyMonths;
  readonly _applyHours: ApplyHours[];
  readonly place: FishPlace;
  readonly shadowSize: FishShadowSize;

  constructor(data: FishData) {
    this._data = data;
    this._applyMonths = new ApplyMonths(data.applyMonths);
    this._applyHours = data.applyHours.map((hours) => new ApplyHours(hours));
    this.place = new FishPlace(data.place, data.onlyRaining);
    this.shadowSize = new FishShadowSize(
      data.shadowSize,
      data.hasFin,
      data.hasSound,
    );
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

  getApplyMonthsData(hemisphere: Hemisphere = Hemisphere.NORTHERN): number[] {
    return this._applyMonths.getData(hemisphere);
  }

  isShadowSizeEqual(shadowSize: FishShadowSizeEnum): boolean {
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
