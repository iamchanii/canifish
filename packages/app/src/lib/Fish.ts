import {
  addHours,
  endOfHour,
  setHours,
  startOfHour,
  subDays,
} from 'date-fns/fp';
import * as R from 'remeda';
import text from '../constants/text';
import { Hemisphere } from './../interface';
import Clock from './Clock';
import { ApplyMonths } from './ApplyMonths';

export enum FishPlace {
  RIVER = 'river',
  CLIFFTOP = 'clifftop',
  MOUTH = 'mouth',
  POND = 'pond',
  OCEAN = 'ocean',
  PIER = 'pier',
}

export enum FishShadowSize {
  NARROW = 'narrow',
  XSMALL = 1,
  SMALL = 2,
  MEDIUM = 3,
  LARGE = 4,
  XLARGE = 5,
  XXLARGE = 6,
}

export interface FishData {
  id: number;
  name: string;
  price: number;
  place: FishPlace[];
  shadowSize: FishShadowSize;
  hasFin: boolean;
  hasSound: boolean;
  onlyRaining: boolean;
  applyHours: number[][];
  applyMonths: number[];
  imageUrl: string;
}

export class ApplyHours {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  _data: number[];

  constructor(data: number[]) {
    this._data = data;
  }

  private get fromHours(): number {
    return this._data[0];
  }

  private get endHours(): number {
    return this._data[1];
  }

  private get diffHours(): number {
    return Math.abs(this.fromHours - (24 + this.endHours)) % 24;
  }

  private isBefore(targetHours: number): boolean {
    return this.fromHours > targetHours;
  }

  private getFromDate(baseDate: Date, targetHours: number): Date {
    return R.pipe(
      baseDate,
      subDays(Number(this.isBefore(targetHours))), // 대상 시간보다 이전인 경우 하루를 빼서 계산
      setHours(this.fromHours), // 시작 시간 설정
      startOfHour, // 시작 시간은 0분 0초로 설정해서 비교
    );
  }

  private getEndDate(baseDate: Date): Date {
    return R.pipe(
      baseDate,
      addHours(this.diffHours), // 시작 시간부터 차이나는 만큼 더함
      endOfHour, // 종료 시간은 59분 59초로 설정해서 비교
    );
  }

  isApplyFromNow() {
    const nowDate = Clock.now;
    const fromDate = this.getFromDate(nowDate, nowDate.getHours());
    const endDate = this.getEndDate(fromDate);

    return (
      fromDate.getTime() <= nowDate.getTime() &&
      nowDate.getTime() <= endDate.getTime()
    );
  }
}

const placeTextMap: { [key in FishPlace]: string } = {
  river: text.PLACE_RIVER,
  mouth: text.PLACE_MOUTH,
  clifftop: text.PLACE_CLIFFTOP,
  pond: text.PLACE_POND,
  ocean: text.PLACE_OCEAN,
  pier: text.PLACE_PIER,
};

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
  _data: FishData;
  _applyMonths: ApplyMonths;
  _applyHours: ApplyHours[];

  constructor(data: FishData) {
    this._data = data;
    this._applyMonths = new ApplyMonths(data.applyMonths);
    this._applyHours = data.applyHours.map((hours) => new ApplyHours(hours));
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

  get placeText(): string {
    return [
      ...this.data.place.map((place) => placeTextMap[place]),
      this.data.onlyRaining && text.ONLY_RAINING,
    ]
      .filter(Boolean)
      .join(', ');
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

  isPlaceIncludes(place: FishPlace): boolean {
    return this.data.place.includes(place);
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
