import { Database } from './interface';
import fishData from './fishData';

export type FishPlace =
  | 'river'
  | 'clifftop'
  | 'mouth'
  | 'pond'
  | 'ocean'
  | 'pier';

export interface Fish {
  id: number;
  name: string;
  price: number;
  place: FishPlace[];
  applyHours: [number, number][];
  applyMonths: number[];
}

export const fishDatabase: Database<Fish[]> = {
  async get() {
    return fishData;
  },
};
