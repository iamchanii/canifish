import { FishPlace } from '@canifish/database';
import text from '../constants/text';

const placeTextMap: { [key in FishPlace]: string } = {
  river: text.PLACE_RIVER,
  mouth: text.PLACE_MOUTH,
  clifftop: text.PLACE_CLIFFTOP,
  pond: text.PLACE_POND,
  ocean: text.PLACE_OCEAN,
  pier: text.PLACE_PIER,
};

const getPlaceText = (
  fishPlaces: FishPlace[],
  options: { onlyRaining?: boolean } = {},
): string => {
  return [
    ...fishPlaces.map((place) => placeTextMap[place]),
    options.onlyRaining && text.ONLY_RAINING,
  ]
    .filter(Boolean)
    .join(', ');
};

export default getPlaceText;
