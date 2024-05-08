import { format, isAfter, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

import type { CalendarVariant, DateRequest } from 'types';

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

export function convertDateStringToVariables(inputDate: string, withoutYear?: boolean): string {
  // Розбиваємо рядок на компоненти
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  return withoutYear ? `${day}.${month}` : `${day}/${month}/${year}`;
}

export function determineNewSelectedDate(
  date: Date,
  currentBeginDate: Date,
  position: string,
): DateRequest {
  const [earlierDate, laterDate] = isAfter(date, currentBeginDate)
    ? [currentBeginDate, date]
    : [date, currentBeginDate];

  return {
    beginDate: formatDateToString(earlierDate, position).dateStringWithPattern,
    endDate: formatDateToString(laterDate, position).dateStringWithPattern,
  };
}

export const formatSortedDate = (dateStr: string | undefined): number => {
  if (dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }
  return 0;
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
  let dayToString = '';

  const { yearMonthDay, dayMonthYear } = formatDateToString(day);

  switch (variant) {
    case 'SearchBlock':
      dayToString = yearMonthDay;
      break;
    case 'FiltersBlock':
      dayToString = dayMonthYear;
      break;
    default:
      break;
  }
  return dayToString;
};

export const isDayInRange = (
  beginDate: string,
  endDate: string,
  certainDayOfMonth: string,
): boolean =>
  !!beginDate && !!endDate && beginDate <= certainDayOfMonth && endDate >= certainDayOfMonth;

export function parseStringToDate(date: string, variant?: string): Date {
  switch (variant) {
    case 'yearFirst':
      return parse(date, 'yyyyMMdd', new Date());
    case 'dayFirst':
      return parse(date, 'dd/MM/yyyy', new Date());

    default:
      return parse(date, 'MMM-yyyy', new Date());
  }
}

export function formatDateToString(date: Date | number, position?: string): FormattedDateObject {
  return {
    dayMonthYear: format(date, 'dd/MM/yyyy'),
    yearMonthDay: format(date, 'yyyyMMdd'),
    monthYear: format(date, 'MMM-yyyy'),
    year: format(date, 'yyyy'),
    month: format(date, 'MMMM'),
    day: format(date, 'd'),
    fullMonthYear: format(date, 'LLLL yyyy', { locale: enUS }),
    dateStringWithPattern: format(date, position === 'request' ? 'yyyyMMdd' : 'dd/MM/yyyy'),
  };
}
