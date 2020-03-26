import { Database } from './interface';
import fishData from './fishData';

export type FishPlace =
  | 'river'
  | 'riverOnCliff'
  | 'mouthOfRiver'
  | 'pond'
  | 'sea'
  | 'seaAtDockside';

export interface Fish {
  id: number;
  name: string;
  price: number;
  place: FishPlace;
  appearanceStartTime: number;
  appearanceEndTime: number;
  appearanceMonths: number[];
}

export const fishDatabase: Database<Fish[]> = {
  async get() {
    return fishData;
  },
};
