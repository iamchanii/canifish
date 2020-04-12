import { FishPlace } from '@canifish/database/src/fish';
import { Chance } from 'chance';
import text from '../../constants/text';
import getPlaceText from '../getPlaceText';

test('river인 경우 text.PLACE_RIVER을 반환한다.', () => {
  expect(getPlaceText(['river'])).toBe(text.PLACE_RIVER);
});

test('mouth인 경우 text.PLACE_MOUTH을 반환한다.', () => {
  expect(getPlaceText(['mouth'])).toBe(text.PLACE_MOUTH);
});

test('clifftop인 경우 text.PLACE_CLIFFTOP을 반환한다.', () => {
  expect(getPlaceText(['clifftop'])).toBe(text.PLACE_CLIFFTOP);
});

test('pond인 경우 text.PLACE_POND을 반환한다.', () => {
  expect(getPlaceText(['pond'])).toBe(text.PLACE_POND);
});

test('ocean인 경우 text.PLACE_OCEAN을 반환한다.', () => {
  expect(getPlaceText(['ocean'])).toBe(text.PLACE_OCEAN);
});
test('pier인 경우 text.PLACE_PIER을 반환한다.', () => {
  expect(getPlaceText(['pier'])).toBe(text.PLACE_PIER);
});

it('onlyRaining 옵션을 전달하면 비 또는 눈이 포함되어 반환된다.', () => {
  const chance = new Chance();
  const place = chance.pickone<FishPlace>([
    'clifftop',
    'mouth',
    'ocean',
    'pier',
    'pond',
    'river',
  ]);

  expect(getPlaceText([place], { onlyRaining: true })).toContain(
    text.ONLY_RAINING,
  );
});
