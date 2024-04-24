import { format, isAfter, parse } from 'date-fns';

import type { CalendarVariant, DateRequest } from 'types';

export function convertDateStringToDDMMYYY(inputDate: string): string {
  if (!inputDate) return '';

  const date = new Date(inputDate);
  return format(date, 'dd/MM/yyyy');
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
  const formatPattern = position === 'request' ? 'yyyyMMdd' : 'dd/MM/yyyy';

  return isAfter(date, currentBeginDate)
    ? { beginDate: format(currentBeginDate, formatPattern), endDate: format(date, formatPattern) }
    : { beginDate: format(date, formatPattern), endDate: format(currentBeginDate, formatPattern) };
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
export const compareDates = (dateA: string, dateB: string): number => {
  const parsedDateA = parseDate(dateA);
  const parsedDateB = parseDate(dateB);
  for (let i = 0; i < 3; i++) {
    if (parsedDateA[i] !== parsedDateB[i]) {
      return parsedDateA[i] - parsedDateB[i];
    }
  }
  return 0;
};

export function formatDateRange(selectedDate: DateRequest): DateRequest {
  return {
    beginDate: selectedDate.beginDate && convertDateStringToVariables(selectedDate.beginDate, true),
    endDate: selectedDate.endDate && convertDateStringToVariables(selectedDate.endDate, true),
  };
}

export const getStringDateToCalendar = (day: Date, variant: CalendarVariant): string => {
  let dayToString = '';

  switch (variant) {
    case 'SearchBlock':
      dayToString = format(day, 'yyyyMMdd');
      break;
    case 'FiltersBlock':
      dayToString = format(day, 'dd/MM/yyyy');
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
