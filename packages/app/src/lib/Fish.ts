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
  readonly #data: FishData;
  readonly #applyMonths: ApplyMonths;
  readonly #applyHours: ApplyHours[];
  readonly #place: FishPlace;
  readonly #shadowSize: FishShadowSize;

  constructor(data: FishData) {
    this.#data = data;
    this.#applyMonths = new ApplyMonths(data.applyMonths);
    this.#applyHours = data.applyHours.map((hours) => new ApplyHours(hours));
    this.#place = new FishPlace(data.place, data.onlyRaining);
    this.#shadowSize = new FishShadowSize(
      data.shadowSize,
      data.hasFin,
      data.hasSound,
    );
  }

  get data(): FishData {
    return this.#data;
  }

  get id(): number {
    return this.#data.id;
  }

  get imageUrl(): string {
    return this.#data.imageUrl;
  }

  get hasSound(): boolean {
    return this.#data.hasSound;
  }

  get hasFin(): boolean {
    return this.#data.hasFin;
  }

  get name(): string {
    return this.#data.name;
  }

  get price(): number {
    return this.#data.price;
  }

  get placeText(): string {
    return this.#place.toString();
  }

  get shadowSizeText(): string {
    return this.#shadowSize.toString();
  }

  get applyHoursText(): string {
    return this.#applyHours.map(String).join(', ');
  }

  getApplyMonthsData(hemisphere: Hemisphere = Hemisphere.NORTHERN): number[] {
    return this.#applyMonths.getData(hemisphere);
  }

  isPriceIncludeIn(priceRange: number[]): boolean {
    const [minPrice, maxPrice] = priceRange;

    return minPrice <= this.data.price && this.data.price <= maxPrice;
  }

  isApplyMonths(
    targetMonth: number,
    hemisphere: Hemisphere = Hemisphere.NORTHERN,
  ): boolean {
    return this.#applyMonths.isApply(targetMonth, hemisphere);
  }

  isApplyNow(hemisphere: Hemisphere = Hemisphere.NORTHERN): boolean {
    return (
      this.isApplyMonths(Clock.nowMonth, hemisphere) &&
      this.#applyHours.some((hours) => hours.isApplyFromNow())
    );
  }
}
