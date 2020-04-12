import Clock from '../lib/Clock';

export default class MockClock {
  static setHours(hours: number): void {
    jest.spyOn(Clock, 'now', 'get').mockImplementation(() => {
      const date = new Date();
      date.setHours(hours);
      return date;
    });
  }

  static setMonths(months: number): void {
    jest.spyOn(Clock, 'nowMonth', 'get').mockImplementation(() => months);
  }
}
