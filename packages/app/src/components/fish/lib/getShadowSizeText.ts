import { FishShadowSize } from '@canifish/database';
import text from '../../../constants/text';

const shadowSizeTextMap: { [key in FishShadowSize]: string } = {
  narrow: text.SIZE_NARROW,
  1: text.SIZE_XSMALL,
  2: text.SIZE_SMALL,
  3: text.SIZE_MEDIUM,
  4: text.SIZE_LARGE,
  5: text.SIZE_XLARGE,
  6: text.SIZE_XXLARGE,
};

const getShadowSizeText = (
  shadowSize: FishShadowSize,
  options: { hasFin?: boolean; hasSound?: boolean } = {},
): string => {
  return [
    shadowSizeTextMap[shadowSize] +
      (typeof shadowSize === 'number' ? `(${shadowSize})` : ''),
    options.hasFin && text.HAS_FIN,
    options.hasSound && text.HAS_SOUND,
  ]
    .filter(Boolean)
    .join(', ');
};

export default getShadowSizeText;
