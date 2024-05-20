import { format, isAfter, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { CalendarVariant, type DateRequest } from 'types';

enum WritingDateFormat {
  YearFirst = 'yyyyMMdd',
  DayFirst = 'dd/MM/yyyy',
  MonthYear = 'MMM-yyyy',
  YearOnly = 'yyyy',
  MonthOnly = 'MMMM',
  DayOnly = 'd',
  Alphanumeric = 'LLLL yyyy',
}

export enum DatePosition {
  Request = 'request',
  Filter = 'filter',
}

interface FormattedDateObject {
  dayMonthYear: string;
  yearMonthDay: string;
  monthYear: string;
  year: string;
  month: string;
  day: string;
  fullMonthYear: string;
  dateStringWithPattern: string;
}

export function convertDateStringToDDMMYYY(inputDate: string): string {
  if (!inputDate) return '';

  const date = new Date(inputDate);
  const { dayMonthYear } = formatDateToString(date);

  return dayMonthYear;
}

//Функція конвертування рядкової дати у відповідний формат
export function convertDateStringToVariables(inputDate: string, withoutYear?: boolean): string {
  // Розбиваємо рядок на компоненти
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  return withoutYear ? `${day}.${month}` : `${day}/${month}/${year}`;
}

//Функція визначення початкової та кінцевої дати для запита та фільтрації
export function determineNewSelectedDate(
  date: Date,
  currentBeginDate: Date,
  position: DatePosition,
): DateRequest {
  const [earlierDate, laterDate] = isAfter(date, currentBeginDate)
    ? [currentBeginDate, date]
    : [date, currentBeginDate];

  const { dateStringWithPattern: firstDate } = formatDateToString(earlierDate, position);
  const { dateStringWithPattern: lastDate } = formatDateToString(laterDate, position);

  return {
    beginDate: firstDate,
    endDate: lastDate,
  };
}

export const formatSortedDate = (dateStr: string | undefined): number => {
  if (!dateStr) {
    return 0;
  }

  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

// Функція для розбиття дати на частини та перетворення на числові значення
const parseDate = (dateString: string): number[] => {
  const [day, month, year] = dateString.split('/').map(Number);
  return [year, month, day];
};

// Порівняння двох дат за принципом календаря
export const compareDates = (dateA: string | undefined, dateB: string | undefined): number => {
  if (dateA && dateB) {
    const parsedDateA = parseDate(dateA);
    const parsedDateB = parseDate(dateB);
    for (let i = 0; i < 3; i++) {
      if (parsedDateA[i] !== parsedDateB[i]) {
        return parsedDateA[i] - parsedDateB[i];
      }
    }
  }
  return 0;
};

export function formatDateRange(selectedDate: DateRequest): DateRequest {
  const { beginDate, endDate } = selectedDate;
  const selectedBeginDate = convertDateStringToVariables(beginDate, true);
  const selectedEndDate = convertDateStringToVariables(endDate, true);

  return {
    beginDate: selectedBeginDate,
    endDate: selectedEndDate,
  };
}

export const getStringDateToCalendar = (day: Date, variant: CalendarVariant): string => {
  const { yearMonthDay, dayMonthYear } = formatDateToString(day);

  switch (variant) {
    case CalendarVariant.Search:
      return yearMonthDay;
    case CalendarVariant.Filter:
      return dayMonthYear;
    default:
      return '';
  }
};

export const isDayInRange = (
  beginDate: string,
  endDate: string,
  certainDayOfMonth: string,
): boolean =>
  !!beginDate && !!endDate && beginDate <= certainDayOfMonth && endDate >= certainDayOfMonth;

function getParsedDate(date: string, format: WritingDateFormat): Date {
  return parse(date, format, new Date());
}

// Function to check if a date is within a given range
export function isDateWithinRange(
  dateString: string | undefined,
  startDate: string,
  endDate: string,
): boolean {
  if (!dateString) return false;

  return dateString >= startDate && dateString <= endDate;
}

export function parseStringToDate(date: string, variant?: string): Date {
  switch (variant) {
    case 'yearFirst':
      return getParsedDate(date, WritingDateFormat.YearFirst);
    case 'dayFirst':
      return getParsedDate(date, WritingDateFormat.DayFirst);

    default:
      return getParsedDate(date, WritingDateFormat.MonthYear);
  }
}

export function formatDateToString(
  date: Date | number,
  position?: DatePosition,
): FormattedDateObject {
  return {
    dayMonthYear: format(date, WritingDateFormat.DayFirst),
    yearMonthDay: format(date, WritingDateFormat.YearFirst),
    monthYear: format(date, WritingDateFormat.MonthYear),
    year: format(date, WritingDateFormat.YearOnly),
    month: format(date, WritingDateFormat.MonthOnly),
    day: format(date, WritingDateFormat.DayOnly),
    fullMonthYear: format(date, WritingDateFormat.Alphanumeric, { locale: enUS }),
    dateStringWithPattern: format(
      date,
      position === DatePosition.Request ? WritingDateFormat.YearFirst : WritingDateFormat.DayFirst,
    ),
  };
}
