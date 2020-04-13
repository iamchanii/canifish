import { Hemisphere } from '../interface';

export default class ApplyMonths {
  readonly #data: number[];

  constructor(data: number[]) {
    this.#data = data;
  }

  getData(hemisphere: Hemisphere): number[] {
    if (hemisphere === Hemisphere.SOUTHERN) {
      return this.#data.map((month) => (month + 6) % 12);
    }
    return this.#data;
  }

  isApply(targetMonth: number, hemisphere: Hemisphere) {
    return this.getData(hemisphere).includes(targetMonth);
  }
}
