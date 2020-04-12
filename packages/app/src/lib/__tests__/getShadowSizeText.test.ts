import { Chance } from 'chance';
import text from '../../constants/text';
import getShadowSizeText from '../getShadowSizeText';
import { FishShadowSize } from '../Fish';

test.each<[FishShadowSize, string]>([
  [FishShadowSize.NARROW, text.SIZE_NARROW],
  [1, text.SIZE_XSMALL + '(1)'],
  [2, text.SIZE_SMALL + '(2)'],
  [3, text.SIZE_MEDIUM + '(3)'],
  [4, text.SIZE_LARGE + '(4)'],
  [5, text.SIZE_XLARGE + '(5)'],
  [6, text.SIZE_XXLARGE + '(6)'],
])('%s를 넣으면 %s를 반환한다.', (size, text) => {
  expect(getShadowSizeText(size)).toBe(text);
});

const chance = new Chance();
const size = chance.pickone<FishShadowSize>([
  FishShadowSize.NARROW,
  1,
  2,
  3,
  4,
  5,
  6,
]);

test('options.hasFin 을 사용하면 text.HAS_FIN을 포함한다.', () => {
  expect(getShadowSizeText(size, { hasFin: true })).toContain(text.HAS_FIN);
});

test('options.hasSound 을 사용하면 text.HAS_SOUND 포함한다.', () => {
  expect(getShadowSizeText(size, { hasSound: true })).toContain(text.HAS_SOUND);
});
