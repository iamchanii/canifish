import Clock from './Clock';

/**
 * 시간을 Date 객체로 변환하는 함수. 현재 날짜를 바탕으로 해당 시간으로 변경한 Date 객체를 반환.
 * @param hour 시간
 */
const convertHoursToDate = (hour: number): Date => {
  const date = Clock.now;
  date.setHours(hour, 0, 0, 0);
  return date;
};

export default convertHoursToDate;
