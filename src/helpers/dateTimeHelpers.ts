import { format } from 'date-fns';

function receiveCurrentTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formatTimeUnit = (timeUnit: number) => {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit.toString();
  };

  const formattedHours = formatTimeUnit(hours);
  const formattedMinutes = formatTimeUnit(minutes);

  return `${formattedHours}:${formattedMinutes}`;
}

export function receiveCurrentDate() {
  const today = new Date();
  const currentTime = receiveCurrentTime();
  const days = today.toDateString().slice(0, 3);
  const month = today.toDateString().slice(4).slice(0, 4);
  const number = today.toDateString().slice(8).slice(0, 2);
  const year = today.toDateString().slice(11);
  const formattedDate = `${currentTime} | ${number} ${month} ${year}`;

  return { days, dateNow: formattedDate };
}

export function formatDate(inputDate: string) {
  if (!inputDate) return '';

  const date = new Date(inputDate);
  const formattedDate = format(date, 'dd/MM/yyyy');

  return formattedDate;
}

export function formatDateToShort(inputDate: string) {
  if (!inputDate) return '';

  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function convertLinesForCalendar(dateStr: string) {
  // Розбиваємо рядок на компоненти
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // Формуємо рядок у бажаному форматі
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function convertUnixTimestampToHHMM(unixTimestamp: number) {
  // Створюємо новий об'єкт Date, використовуючи переданий Unix Timestamp (у мілісекундах)
  const date = new Date(unixTimestamp * 1000);

  // Отримуємо години та хвилини з цього об'єкта Date
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Форматуємо години та хвилини до двозначного формату
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  // Повертаємо рядок у форматі HH:MM
  return `${formattedHours}:${formattedMinutes}`;
}
