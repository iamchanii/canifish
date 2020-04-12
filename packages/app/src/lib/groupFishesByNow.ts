import { Hemisphere } from '../interface';
import Fish from './Fish';

export interface ReduceFishesResult {
  available: Fish[];
  etc: Fish[];
}

/**
 * 현재 월/시간과 반구를 바탕으로 잡을 수 있는 물고기와 그 외 물고기를 분류하는 함수.
 * @param fishes 물고기 데이터 배열
 * @param hemisphere 북반구 또는 남반구
 */
const groupFishesByNow = (
  fishes: Fish[],
  hemisphere: Hemisphere,
): ReduceFishesResult => {
  const callbackFn = (
    acc: ReduceFishesResult,
    fish: Fish,
  ): ReduceFishesResult => {
    const isAvailableNow = fish.isApplyNow(hemisphere);
    acc[isAvailableNow ? 'available' : 'etc'].push(fish);

    return acc;
  };

  return fishes.reduce(callbackFn, {
    available: [],
    etc: [],
  });
};

export default groupFishesByNow;
