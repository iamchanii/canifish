import text from '../../../constants/text';
import convertHoursToDate from './convertHoursToDate';

/**
 * 물고기 출현 시간 배열을 텍스트로 반환하는 함수.
 * @param applyHours 출현 시간 배열
 */
const getApplyHoursText = (applyHours: number[][]) => {
  const callbackFn = (hours: number[]): string => {
    return isAllDay(hours) ? text.ALL_DAY : getHourTextByHoursArray(hours);
  };

  return applyHours.map(callbackFn).join(', ');
};

/**
 * 해당 배열이 하루 종일에 해당하는지 확인하는 함수
 * @param hours 출현 시간 배열
 */
const isAllDay = (hours: number[]) => hours[0] === 0 && hours[1] === 23;

/**
 * 출현 시간 배열을 Date 객체로 변환한 뒤 시간 텍스트로 반환하는 함수.
 * @param hours 출현 시간 배열
 */
const getHourTextByHoursArray = (hours: number[]): string => {
  const callbackFn = (hour: number) => {
    const date = convertHoursToDate(hour);
    return formatDateToHourText(date);
  };

  return hours.map(callbackFn).join(' ~ ');
};

const FALLBACK_LANGUAGE = 'ko';

/**
 * 현재 브라우저의 언어를 가져오는 함수.
 */
const getBrowserLanguage = (): string => {
  // language를 지원하지 않고, userLanguage 또는 systemLanguage를 지원할 경우를 대비.
  const {
    language,
    userLanguage,
    systemLanguage,
  } = window.navigator as Navigator & {
    userLanguage?: string;
    systemLanguage?: string;
  };

  const currentLanguage =
    language ?? userLanguage ?? systemLanguage ?? FALLBACK_LANGUAGE;

  return currentLanguage.toLowerCase().slice(0, 2);
};

const language = getBrowserLanguage();

const intlOptionsByLanguageMap: {
  [key: string]: Intl.DateTimeFormatOptions;
} = {
  ko: {
    hour: 'numeric',
    hour12: false,
  },
  en: {
    hour: 'numeric',
    hour12: true,
  },
};

const dateTimeFormat = new Intl.DateTimeFormat(
  language,
  intlOptionsByLanguageMap[language] ?? {
    hour: 'numeric',
    hour12: false,
  },
);

/**
 * Date 객체를 사용하여 시간 텍스트를 반환하는 함수.
 * @param date
 */
const formatDateToHourText = (date: Date): string => {
  return dateTimeFormat.format(date);
};

export default getApplyHoursText;
