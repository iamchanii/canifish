import {
  addHours,
  endOfHour,
  setHours,
  startOfHour,
  subDays,
} from 'date-fns/fp';
import * as R from 'remeda';
import Clock from './Clock';

export default class ApplyHours {
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
      startOfHour,
    );
  }
  private getEndDate(baseDate: Date): Date {
    return R.pipe(
      baseDate,
      addHours(this.diffHours), // 시작 시간부터 차이나는 만큼 더함
      endOfHour,
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
