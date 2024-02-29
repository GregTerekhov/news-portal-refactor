import { format, isAfter } from 'date-fns';

type SelectedDate = {
  beginDate: string;
  endDate: string;
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
