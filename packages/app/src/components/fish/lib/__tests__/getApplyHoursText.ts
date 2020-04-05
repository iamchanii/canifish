import { Chance } from 'chance';
import getApplyHoursText from '../getApplyHoursText';
import text from '../../../../constants/text';

test('하루 종일에 해당하는 경우 하루 종일을 반환한다.', () => {
  expect(getApplyHoursText([[0, 23]])).toContain(text.ALL_DAY);
});

test('시간 배열을 텍스트로 반환한다.', () => {
  const chance = new Chance();
  const applyHours = [[chance.hour(), chance.hour()]];
  const text = getApplyHoursText(applyHours);

  expect(text).toContain(applyHours[0][0].toString());
  expect(text).toContain(applyHours[0][1].toString());
});
