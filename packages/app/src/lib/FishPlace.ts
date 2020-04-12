import text from '../constants/text';

export enum FishPlaceEnum {
  RIVER = 'river',
  CLIFFTOP = 'clifftop',
  MOUTH = 'mouth',
  POND = 'pond',
  OCEAN = 'ocean',
  PIER = 'pier',
}

const placeTextMap: { [key in FishPlaceEnum]: string } = {
  river: text.PLACE_RIVER,
  mouth: text.PLACE_MOUTH,
  clifftop: text.PLACE_CLIFFTOP,
  pond: text.PLACE_POND,
  ocean: text.PLACE_OCEAN,
  pier: text.PLACE_PIER,
};

export default class FishPlace {
  private readonly places: FishPlaceEnum[];
  private readonly onlyRaining: boolean;

  constructor(places: FishPlaceEnum[], onlyRaining: boolean = false) {
    this.places = places;
    this.onlyRaining = onlyRaining;
  }

  toString() {
    return [
      ...this.places.map((place) => placeTextMap[place]),
      this.onlyRaining && text.ONLY_RAINING,
    ]
      .filter(Boolean)
      .join(', ');
  }

  includes(place: FishPlaceEnum): boolean {
    return this.places.includes(place);
  }
}
