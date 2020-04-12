import { Chance } from 'chance';
import text from '../../constants/text';
import FishPlace, { FishPlaceEnum } from '../FishPlace';

const chance = new Chance();

describe('placeText', () => {
  it('river인 경우 text.PLACE_RIVER을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.RIVER], false);

    expect(fishPlace.toString()).toContain(text.PLACE_RIVER);
  });

  it('mouth인 경우 text.PLACE_MOUTH을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.MOUTH], false);

    expect(fishPlace.toString()).toContain(text.PLACE_MOUTH);
  });

  it('clifftop인 경우 text.PLACE_CLIFFTOP을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.CLIFFTOP], false);

    expect(fishPlace.toString()).toContain(text.PLACE_CLIFFTOP);
  });

  it('pond인 경우 text.PLACE_POND을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.POND], false);

    expect(fishPlace.toString()).toContain(text.PLACE_POND);
  });

  it('ocean인 경우 text.PLACE_OCEAN을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.OCEAN], false);

    expect(fishPlace.toString()).toContain(text.PLACE_OCEAN);
  });

  it('pier인 경우 text.PLACE_PIER을 반환한다.', () => {
    const fishPlace = new FishPlace([FishPlaceEnum.PIER], false);

    expect(fishPlace.toString()).toContain(text.PLACE_PIER);
  });

  it('onlyRaining 옵션을 전달하면 비 또는 눈이 포함되어 반환된다.', () => {
    const fishPlace = new FishPlace(
      chance.pickset([
        FishPlaceEnum.CLIFFTOP,
        FishPlaceEnum.MOUTH,
        FishPlaceEnum.OCEAN,
        FishPlaceEnum.PIER,
        FishPlaceEnum.POND,
        FishPlaceEnum.RIVER,
      ]),
      true,
    );

    expect(fishPlace.toString()).toContain(text.ONLY_RAINING);
  });
});

describe('includes', () => {
  it('특정 장소를 포함하면 true', () => {
    const fishPlace = new FishPlace([
      FishPlaceEnum.CLIFFTOP,
      FishPlaceEnum.MOUTH,
      FishPlaceEnum.OCEAN,
      FishPlaceEnum.PIER,
      FishPlaceEnum.POND,
      FishPlaceEnum.RIVER,
    ]);

    expect(
      fishPlace.includes(
        chance.pickone([
          FishPlaceEnum.CLIFFTOP,
          FishPlaceEnum.MOUTH,
          FishPlaceEnum.OCEAN,
          FishPlaceEnum.PIER,
          FishPlaceEnum.POND,
          FishPlaceEnum.RIVER,
        ]),
      ),
    ).toBe(true);
  });

  it('특정 장소를 포함하지 않으면 false', () => {
    const fishPlace = new FishPlace([]);

    expect(
      fishPlace.includes(
        chance.pickone([
          FishPlaceEnum.CLIFFTOP,
          FishPlaceEnum.MOUTH,
          FishPlaceEnum.OCEAN,
          FishPlaceEnum.PIER,
          FishPlaceEnum.POND,
          FishPlaceEnum.RIVER,
        ]),
      ),
    ).toBe(false);
  });
});
