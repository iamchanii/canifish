import {
  addHours,
  endOfHour,
  setHours,
  startOfHour,
  subDays,
} from 'date-fns/fp';
import * as R from 'remeda';
import text from '../constants/text';
import Clock from './Clock';
import convertHoursToDate from './convertHoursToDate';

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

export default class ApplyHours {
  // TODO: react-scripts TS 3.8 지원 시 private field로 전환
  _data: number[];

  constructor(data: number[]) {
    this._data = data;
  }

  private get fromHours(): number {
    return this._data[0];
  }

  private get endHours(): number {
    return this._data[1];
  }

  private get diffHours(): number {
    return Math.abs(this.fromHours - (24 + this.endHours)) % 24;
  }

  private isBefore(targetHours: number): boolean {
    return this.fromHours > targetHours;
  }

  private getFromDate(baseDate: Date, targetHours: number): Date {
    return R.pipe(
      baseDate,
      subDays(Number(this.isBefore(targetHours))), // 대상 시간보다 이전인 경우 하루를 빼서 계산
      setHours(this.fromHours), // 시작 시간 설정
      startOfHour,
    );
  }

  private getEndDate(baseDate: Date): Date {
    return R.pipe(
      baseDate,
      addHours(this.diffHours), // 시작 시간부터 차이나는 만큼 더함
      endOfHour,
    );
  }

  isApplyFromNow() {
    const nowDate = Clock.now;
    const fromDate = this.getFromDate(nowDate, nowDate.getHours());
    const endDate = this.getEndDate(fromDate);
    return (
      fromDate.getTime() <= nowDate.getTime() &&
      nowDate.getTime() <= endDate.getTime()
    );
  }

  private get isAllDay(): boolean {
    return this._data[0] === 0 && this._data[1] === 23;
  }

  private static _intl = new Intl.DateTimeFormat(
    language,
    intlOptionsByLanguageMap[language],
  );

  private format(date: Date): string {
    return ApplyHours._intl.format(date);
  }

  toString(): string {
    if (this.isAllDay) {
      return text.ALL_DAY;
    }

    return this._data
      .map((hour) => {
        const date = convertHoursToDate(hour);
        return this.format(date);
      })
      .join(' ~ ');
  }
}
