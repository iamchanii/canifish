import { Hemisphere } from '../interface';

export class ApplyMonths {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  _data: number[];
  constructor(data: number[]) {
    this._data = data;
  }
  getData(hemisphere: Hemisphere): number[] {
    if (hemisphere === Hemisphere.SOUTHERN) {
      return this._data.map((month) => (month + 6) % 12);
    }
    return this._data;
  }
  isApply(targetMonth: number, hemisphere: Hemisphere) {
    return this.getData(hemisphere).includes(targetMonth);
  }
}
