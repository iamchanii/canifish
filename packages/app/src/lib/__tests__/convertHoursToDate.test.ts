import { Chance } from 'chance';
import convertHoursToDate from '../convertHoursToDate';

const chance = new Chance();

test('특정 시간을 전달하면 해당 시간을 기준으로 Date 객체를 반환한다.', () => {
  const hour = chance.hour({ twentyfour: true });
  const date = convertHoursToDate(hour);

  expect(date).toBeInstanceOf(Date);
  expect(date.getHours()).toBe(hour);
});
