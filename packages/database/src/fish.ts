import type { ApiResponse } from '@canifish/api';
import api from './api';
import type { Database } from './interface';

export enum FishPlace {
  RIVER = 'river',
  CLIFFTOP = 'clifftop',
  MOUTH = 'mouth',
  POND = 'pond',
  OCEAN = 'ocean',
  PIER = 'pier',
}

export enum FishShadowSize {
  NARROW = 'narrow',
  XSMALL = 1,
  SMALL = 2,
  MEDIUM = 3,
  LARGE = 4,
  XLARGE = 5,
  XXLARGE = 6,
}

export interface Fish {
  id: number;
  name: string;
  price: number;
  place: FishPlace[];
  shadowSize: FishShadowSize;
  hasFin: boolean;
  hasSound: boolean;
  onlyRaining: boolean;
  applyHours: number[][];
  applyMonths: number[];
  imageUrl: string;
}

export const fishDatabase: Database<Fish[]> = {
  async get() {
    const response = await fetch(api.GET_FISHES);
    const { data } = (await response.json()) as ApiResponse<Fish[]>;

    return data;
  },
};
