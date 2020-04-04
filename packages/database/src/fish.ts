import type { ApiResponse } from '@canifish/api';
import api from './api';
import type { Database } from './interface';

export type FishPlace =
  | 'river'
  | 'clifftop'
  | 'mouth'
  | 'pond'
  | 'ocean'
  | 'pier';

export type FishShadowSize = number | 'narrow';

export interface Fish {
  id: number;
  name: string;
  price: number;
  place: FishPlace[];
  shadowSize: FishShadowSize;
  hasFin: boolean;
  hasSound: boolean;
  onlyRaining: boolean;
  applyHours: [number, number][];
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
