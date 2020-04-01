import { Database } from './interface';
import fishData from './fishData';

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
  applyHours: [number, number][];
  applyMonths: number[];
}

export const fishDatabase: Database<Fish[]> = {
  async get() {
    return fishData;
  },
};
