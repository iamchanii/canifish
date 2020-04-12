export default class Clock {
  static get now(): Date {
    return new Date();
  }

  static get nowMonth(): number {
    return this.now.getMonth();
  }
}
