import {
  addHours,
  endOfHour,
  setHours,
  startOfHour,
  subDays,
} from 'date-fns/fp';
import * as R from 'remeda';
import { Hemisphere } from './../interface';
import Clock from './Clock';

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

export class ApplyMonths {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  getData(hemisphere: Hemisphere): number[] {
    if (hemisphere === Hemisphere.SOUTHERN) {
      return this.data.map((month) => (month + 6) % 12);
    }

    return this.data;
  }

  isApply(targetMonth: number, hemisphere: Hemisphere) {
    return this.getData(hemisphere).includes(targetMonth);
  }
}

export class ApplyHours {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  private get fromHours(): number {
    return this.data[0];
  }

  private get endHours(): number {
    return this.data[1];
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

export interface FishMatchOptions {
  month?: number;
  hemisphere?: Hemisphere;
  priceRange?: number[];
  place?: FishPlace;
  shadow?: FishShadowSize;
  hasFin?: boolean;
  hasSound?: boolean;
}

export default class Fish {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  _data: FishData;
  applyMonths: ApplyMonths;
  applyHours: ApplyHours[];

  constructor(data: FishData) {
    this._data = data;
    this.applyMonths = new ApplyMonths(data.applyMonths);
    this.applyHours = data.applyHours.map((hours) => new ApplyHours(hours));
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
    return this.applyMonths.isApply(targetMonth, hemisphere);
  }

  isApplyNow(hemisphere: Hemisphere = Hemisphere.NORTHERN): boolean {
    return (
      this.isApplyMonths(Clock.nowMonth, hemisphere) &&
      this.applyHours.some((hours) => hours.isApplyFromNow())
    );
  }
}
