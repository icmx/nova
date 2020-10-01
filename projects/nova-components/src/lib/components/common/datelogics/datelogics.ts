const NUMBER_PARSEINT_RADIX: number = 10;
const TIMEZONE_OFFSET: number = new Date().getTimezoneOffset() * 60000;

export type CalendarDateType =
  | 'internal' // Date object
  | 'string-iso' // String 'YYYY-MM-DD'
  | 'string-local'; // String 'DD.MM.YYYY'

export interface CalendarItem {
  value: any;
  shortLabel: string;
  fullLabel: string;
}

export interface CalendarLabels {
  year: string;
  month: string;
  day: string;
  date: string;
  currentDate: string;
  currentYear: string;
  currentMonth: string;
  placeholder: string;
}

export interface CalendarSettings {
  years: Array<number>;
  months: Array<CalendarItem>;
  monthDays: Array<number>;
  weekDays: Array<CalendarItem>;
  weekEnds: Array<number>;
  weekFirstDay: number;
  datesDisabled: Array<Date>;
  dateMin: Date;
  dateMax: Date;
  dateValueType: CalendarDateType;
  dateLabelType: CalendarDateType;
}

export class CalendarUtils {
  public static getSequence(start: number, end: number): Array<number> {
    const result: Array<number> = Array(end - start + 1)
      .fill(0)
      .map((item, index) => start + index);
    return result;
  }

  public static getWeekNumber(value: Date): number {
    const nDay: number = (value.getDay() + 6) % 7;
    value.setDate(value.getDate() - nDay + 3);

    const n1stThursday: number = value.valueOf();
    value.setMonth(0, 1);

    if (value.getDay() !== 4) {
      value.setMonth(0, 1 + ((4 - value.getDay() + 7) % 7));
    }

    return 1 + Math.ceil((n1stThursday - value.getTime()) / 604800000);
  }

  public static getDateWithTimezoneOffset(value: Date): Date {
    return new Date(value.getTime() - TIMEZONE_OFFSET);
  }
}

export class CalendarTransforms {
  public static dateToDateOnly(value: Date): Date {
    const result: Date = value;

    result.setFullYear(value.getFullYear());
    result.setMonth(value.getMonth());
    result.setDate(value.getDate());
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);

    return result;
  }

  public static dateToISOString(value: Date): string {
    return value.toISOString().slice(0, 10);
  }

  public static dateToLocalString(value: Date): string {
    return value.toLocaleDateString();
  }

  public static iso8601StringToDate(value: string): Date {
    const result: Array<string> = value.split('-');

    const year: number = Number.parseInt(result[0], NUMBER_PARSEINT_RADIX);
    const month: number = Number.parseInt(result[1], NUMBER_PARSEINT_RADIX);
    const day: number = Number.parseInt(result[2], NUMBER_PARSEINT_RADIX);

    return new Date(year, month, day);
  }

  public static localStringToDate(value: string): Date {
    const result: Array<string> = value.split('.');

    const year: number = Number.parseInt(result[2], NUMBER_PARSEINT_RADIX);
    const month: number = Number.parseInt(result[1], NUMBER_PARSEINT_RADIX);
    const day: number = Number.parseInt(result[0], NUMBER_PARSEINT_RADIX);

    return new Date(year, month, day);
  }
}

export class DateLogic {
  private _value: Date = null;

  public locale: CalendarLabels = null;
  public settings: CalendarSettings = null;

  public set value(value: any) {
    if (value) {
      switch (this.settings.dateValueType) {
        case 'internal':
          this._value = CalendarTransforms.dateToDateOnly(value);
          break;
        case 'string-iso':
          this._value = CalendarTransforms.iso8601StringToDate(value);
          break;
        case 'string-local':
          this._value = CalendarTransforms.localStringToDate(value);
          break;
      }
    } else {
      this._value = null;
    }
  }

  public get value(): any {
    if (this._value) {
      switch (this.settings.dateValueType) {
        case 'internal':
          return CalendarTransforms.dateToDateOnly(this._value);
        case 'string-iso':
          return CalendarTransforms.dateToISOString(this._value);
        case 'string-local':
          return CalendarTransforms.dateToLocalString(this._value);
      }
    } else {
      return null;
    }
  }

  public get label(): string {
    if (this.value) {
      switch (this.settings.dateLabelType) {
        case 'internal':
          return CalendarTransforms.dateToDateOnly(this.value).toDateString();
        case 'string-iso':
          return CalendarTransforms.dateToISOString(this.value);
        case 'string-local':
          return CalendarTransforms.dateToLocalString(this.value);
      }
    } else {
      return this.locale.placeholder;
    }
  }

  private guiYear: number;
  private guiMonth: number;
  private guiDay: number;

  public guiFirstDayOfMonth: Date;
  public guiLastDayOfMonth: Date;
  public guiLastDayOfPreviousMonth: Date;
  public guiDaysInMonth: number;
  public guiDaysInLastMonth: number;
  public guiDayOfWeek: number;
  public guiLeadingDaysCount: number;
  public guiDays: Array<number>;
  public guiLeadingDays: Array<number>;
  public guiTrailingDays: Array<number>;
  public guiFirstDay: Date;
  public guiFirstWeekNumber: number;
  public guiWeekNumbers: Array<number>;
  public guiLocalizedDaysOfWeek: Array<CalendarItem>;

  public init(
    value: Date | string | number = null,
    localeYear: string = 'Год',
    localeMonth: string = 'Месяц',
    localeDay: string = 'Число',
    localeDate: string = 'Дата',
    localeCurrentDate: string = 'Сегодня',
    localeCurrentYear: string = 'Текущий',
    localeCurrentMonth: string = 'Текущий',
    localePlaceholder: string = 'Выберите дату',
    settingsWeekEnds: Array<number> = [0, 6],
    settingsWeekFirstDay: number = 1,
    settingsDatesDisabled: Array<Date> = [],
    settingsDateMin: Date = new Date(1970, 0, 1),
    settingsDateMax: Date = new Date(2037, 11, 31),
    settingsDateValueType: CalendarDateType = 'internal',
    settingsDateLabelType: CalendarDateType = 'string-local'
  ): void {
    this.value = value;
    this.locale = {
      year: localeYear,
      month: localeMonth,
      day: localeDay,
      date: localeDate,
      currentDate: localeCurrentDate,
      currentYear: localeCurrentYear,
      currentMonth: localeCurrentMonth,
      placeholder: localePlaceholder,
    };

    this.settings = {
      years: CalendarUtils.getSequence(
        settingsDateMin.getFullYear(),
        settingsDateMax.getFullYear()
      ),
      months: [
        { value: 0, shortLabel: 'Jan', fullLabel: 'January' },
        { value: 1, shortLabel: 'Feb', fullLabel: 'February' },
        { value: 2, shortLabel: 'Mar', fullLabel: 'March' },
        { value: 3, shortLabel: 'Apr', fullLabel: 'April' },
        { value: 4, shortLabel: 'May', fullLabel: 'May' },
        { value: 5, shortLabel: 'Jun', fullLabel: 'June' },
        { value: 6, shortLabel: 'Jul', fullLabel: 'Jule' },
        { value: 7, shortLabel: 'Aug', fullLabel: 'July' },
        { value: 8, shortLabel: 'Sep', fullLabel: 'September' },
        { value: 9, shortLabel: 'Oct', fullLabel: 'October' },
        { value: 10, shortLabel: 'Nov', fullLabel: 'November' },
        { value: 11, shortLabel: 'Dec', fullLabel: 'December' },
      ],
      monthDays: CalendarUtils.getSequence(1, 31),
      weekDays: [
        { value: 0, shortLabel: 'Sun', fullLabel: 'Sunday' },
        { value: 1, shortLabel: 'Mon', fullLabel: 'Monday' },
        { value: 2, shortLabel: 'Tue', fullLabel: 'Tuesday' },
        { value: 3, shortLabel: 'Wed', fullLabel: 'Wednesday' },
        { value: 4, shortLabel: 'Thu', fullLabel: 'Thursday' },
        { value: 5, shortLabel: 'Fri', fullLabel: 'Friday' },
        { value: 6, shortLabel: 'Sat', fullLabel: 'Saturday' },
      ],
      weekEnds: settingsWeekEnds,
      weekFirstDay: settingsWeekFirstDay,
      datesDisabled: settingsDatesDisabled,
      dateMin: settingsDateMin,
      dateMax: settingsDateMax,
      dateValueType: settingsDateValueType,
      dateLabelType: settingsDateLabelType,
    };

    this.guiUpdateCurrent();
  }

  public isDisabled(value: Date): boolean {
    if (value < this.settings.dateMin) {
      return true;
    }

    if (value > this.settings.dateMax) {
      return true;
    }

    if (this.settings.datesDisabled.includes(value)) {
      return true;
    }

    return false;
  }

  public isWeekEnd(value: Date): boolean {
    return this._value
      ? this.settings.weekEnds.indexOf(value.getDay()) !== -1
      : false;
  }

  public isSelected(value: Date): boolean {
    return this._value ? this._value.getTime() === value.getTime() : false;
  }

  // TODO
  // public isDefault(value: Date): boolean {
  //   // return this.settingsDateDefault.getTime() === value.getTime();
  // }

  public toDate(yearOffset: number, monthOffset: number, day: number) {
    return new Date(
      this.guiYear + yearOffset,
      this.guiMonth + monthOffset,
      day
    );
  }

  public guiUpdate(year: number, month: number, day: number): void {
    this.guiYear = month > 11 ? year + 1 : month < 0 ? year - 1 : year;
    this.guiMonth = (month + 12) % 12;
    this.guiDay = day;

    this.guiFirstDayOfMonth = new Date(this.guiYear, this.guiMonth, 1);
    this.guiLastDayOfMonth = new Date(this.guiYear, this.guiMonth + 1, 0);
    this.guiLastDayOfPreviousMonth = new Date(this.guiYear, this.guiMonth, 0);
    this.guiDaysInMonth = this.guiLastDayOfMonth.getDate();
    this.guiDaysInLastMonth = this.guiLastDayOfPreviousMonth.getDate();
    this.guiDayOfWeek = this.guiFirstDayOfMonth.getDay();
    this.guiLeadingDaysCount =
      (this.guiDayOfWeek - this.settings.weekFirstDay + 7) % 7 || 7;
    this.guiLeadingDays = this.settings.monthDays.slice(
      -this.guiLeadingDaysCount - (31 - this.guiDaysInLastMonth),
      this.guiDaysInLastMonth
    );
    this.guiTrailingDays = this.settings.monthDays.slice(
      0,
      6 * 7 - (this.guiLeadingDaysCount + this.guiDaysInMonth)
    );
    this.guiFirstDay = new Date(this.guiFirstDayOfMonth);
    this.guiFirstDay.setDate(
      this.guiFirstDayOfMonth.getDate() - (this.guiLeadingDaysCount % 7)
    );
    this.guiFirstWeekNumber = CalendarUtils.getWeekNumber(this.guiFirstDay);
    this.guiWeekNumbers = Array(
      Math.ceil((this.guiDaysInMonth + (this.guiLeadingDaysCount % 7)) / 7)
    )
      .fill(0)
      .map((e, i) => {
        const weekNumber = (i + this.guiFirstWeekNumber + 52) % 52;
        return weekNumber === 0 ? 52 : weekNumber;
      });
    this.guiLocalizedDaysOfWeek = this.settings.weekDays
      .concat(this.settings.weekDays)
      .splice(this.settings.weekFirstDay, 7);
    this.guiDays = this.settings.monthDays.slice(0, this.guiDaysInMonth);
  }

  public guiUpdateCurrent(): void {
    const value: Date = this._value ? this._value : new Date();

    const year: number = value.getFullYear();
    const month: number = value.getMonth();
    const day: number = value.getDate();

    this.guiUpdate(year, month, day);
  }

  public guiUpdateYearPrev(): void {
    this.guiUpdate(this.guiYear - 1, this.guiMonth, this.guiDay);
  }

  public guiUpdateYearSet(value: number): void {
    this.guiUpdate(value, this.guiMonth, this.guiDay);
  }

  public guiUpdateYearNext(): void {
    this.guiUpdate(this.guiYear + 1, this.guiMonth, this.guiDay);
  }

  public guiUpdateMonthPrev(): void {
    this.guiUpdate(this.guiYear, this.guiMonth - 1, this.guiDay);
  }

  public guiUpdateMonthSet(value: number): void {
    this.guiUpdate(this.guiYear, value, this.guiDay);
  }

  public guiUpdateMonthNext(): void {
    this.guiUpdate(this.guiYear, this.guiMonth + 1, this.guiDay);
  }

  public guiUpdateDayPrev(): void {
    this.guiUpdate(this.guiYear, this.guiMonth, this.guiDay - 1);
  }

  public guiUpdateDaySet(value: number): void {
    this.guiUpdate(this.guiYear, this.guiMonth, value);
  }

  public guiUpdateDayNext(): void {
    this.guiUpdate(this.guiYear, this.guiMonth, this.guiDay + 1);
  }

  public get guiYearLabel(): any {
    return this.guiYear.toString();
  }

  public get guiMonthLabel(): any {
    return this.settings.months[this.guiMonth];
  }
}
