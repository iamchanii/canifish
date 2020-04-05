import { Fish } from '@canifish/database';
import { Hemisphere } from '../interface';
import convertHoursToDate from './convertHoursToDate';

export interface ReduceFishesResult {
  available: Fish[];
  etc: Fish[];
}

/**
 * 현재 월/시간과 반구를 바탕으로 잡을 수 있는 물고기와 그 외 물고기를 분류하는 함수.
 * @param fishes 물고기 데이터 배열
 * @param nowMonth 현재 월
 * @param nowHours 현재 시간 (Hour)
 * @param hemisphere 북반구 또는 남반구
 */
const groupFishesByNow = (
  fishes: Fish[],
  nowMonth: number,
  nowHours: number,
  hemisphere: Hemisphere,
): ReduceFishesResult => {
  const callbackFn = (
    acc: ReduceFishesResult,
    fish: Fish,
  ): ReduceFishesResult => {
    const { applyHours } = fish;

    // 남반구인 경우 출현 기간을 6개월씩 조정.
    const applyMonths =
      hemisphere === 'southern'
        ? fish.applyMonths.map(shiftSixMonths)
        : fish.applyMonths;

    // 현재 월이 출현 기간에 포함되어 있고, 현재 시간이 출현 시간 사이에 있는지 확인.
    const isAvailableNow =
      applyMonths.includes(nowMonth) &&
      isApplyTimeFromNow(applyHours, nowHours);

    // 현재 출현중인 물고기라면 available, 아니면 etc로 분류
    acc[isAvailableNow ? 'available' : 'etc'].push({
      ...fish,
      applyMonths,
    });

    return acc;
  };

  return fishes.reduce(callbackFn, {
    available: [],
    etc: [],
  });
};

/**
 * 입력받은 수를 6씩 조정하는 함수.
 * @param month
 */
const shiftSixMonths = (month: number): number => (month + 6) % 12;

/**
 * 현재 시간이 출현 시간 배열을 기준으로 포함되는지 확인하는 함수.
 * @param applyHours 출현 시간 배열
 * @param nowHours 현재 시간
 */
const isApplyTimeFromNow = (
  applyHours: number[][],
  nowHours: number,
): boolean => {
  const nowDateTime = convertHoursToDate(nowHours).getTime();

  const callbackFn = ([fromHours, endHours]: number[]): boolean => {
    const diffHours = Math.abs(fromHours - endHours);

    const fromDate = new Date();
    fromDate.setHours(fromHours, 0, 0, 0);
    const fromDateTime = fromDate.getTime();

    const endDate = new Date(fromDate);
    endDate.setHours(endDate.getHours() + diffHours, 59, 59, 999);
    const endDateTime = endDate.getTime();

    return fromDateTime <= nowDateTime && nowDateTime <= endDateTime;
  };

  return applyHours.some(callbackFn);
};

export default groupFishesByNow;
