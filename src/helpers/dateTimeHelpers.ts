import { format, isAfter } from 'date-fns';

import type { SelectedDate } from 'types';

type FormattedDate = {
  firstDate: string;
  lastDate: string;
};

export function formatDate(inputDate: string): string {
  if (!inputDate) return '';

  const date = new Date(inputDate);
  const formattedDate = format(date, 'dd/MM/yyyy');

  return formattedDate;
}

export function formatDateToShort(inputDate: string): string {
  if (!inputDate) return '';

  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function convertDateFormat(inputDate: string): string {
  // Витягаємо рік, місяць і день з рядка
  // const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  // Об'єднуємо їх у новий формат "dd.MM"
  const outputDate = `${day}.${month}`;

  return outputDate;
}

export function convertLinesForCalendar(dateStr: string): string {
  // Розбиваємо рядок на компоненти
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // Формуємо рядок у бажаному форматі
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function determineNewSelectedDate(
  date: Date,
  currentBeginDate: Date,
  position: string,
): SelectedDate {
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

export function formatDateRange(selectedDate: SelectedDate): FormattedDate {
  return {
    firstDate: selectedDate.beginDate && convertDateFormat(selectedDate.beginDate),
    lastDate: selectedDate.endDate && convertDateFormat(selectedDate.endDate),
  };
}

export const getStringDateToCalendar = (day: Date, variant: string): string => {
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
  beginDate: string | null,
  endDate: string | null,
  selectedDate: string,
) => beginDate && endDate && beginDate <= selectedDate && endDate >= selectedDate;

export const formatDateToYYYYMMDD = (filterDate: string): string => {
  const day = filterDate.slice(0, 2);
  const month = filterDate.slice(3, 5);
  const year = filterDate.slice(6);

  return `${year}${month}${day}`;
};
