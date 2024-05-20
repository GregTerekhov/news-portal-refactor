import { beaufortScale, daysMap, ScaleObject, TimezoneOffset, zoneList } from './constants';

type WeatherCurrentTime = {
  days: string;
  dateNow: string;
};

export function convertTimezone(data: number): string | undefined {
  const key = String(data) as TimezoneOffset;

  return zoneList[key];
}

//Функція конвертації км в метри
export function formatKmToMetre(distance: number): number {
  return distance / 1000;
}
//Виведення значення сили ветра за шкалою Бофорта
export function getWindStrengthScale(windSpeed: number): string {
  let interval: ScaleObject | undefined;

  if (windSpeed) {
    // Знаходимо відповідний інтервал вітрової швидкості в шкалі Бофорта
    interval = beaufortScale.find((range) => windSpeed >= range.min && windSpeed <= range.max);
  }

  // Повертаємо відповідну іконку або значення за замовчуванням
  return interval ? interval?.scale : '';
}

export function convertUnixTimestampToHHMM(unixTimestamp: number): string {
  // Створюємо новий об'єкт Date, використовуючи переданий Unix Timestamp (у мілісекундах)
  const date = new Date(unixTimestamp * 1000);

  // Отримуємо години та хвилини з цього об'єкта Date
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Форматуємо години та хвилини до двозначного формату
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  // Повертаємо рядок у форматі HH:MM
  return `${paddedHours}:${paddedMinutes}`;
}

//Функція виведення значення атмосферного тиску
export function convertPressure(hPa: number): number {
  return Math.floor(hPa * 0.75006);
}

//Функція конвертації температур (Цельсій <=> Фаренгейт)
export const convertTemperature = (temp: number, isCelsius: boolean): string => {
  return isCelsius && temp
    ? Math.round(temp) + '\u00b0'
    : Math.round((temp * 9) / 5 + 32) + '\u00b0';
};

const formatTimeUnit = (timeUnit: number): string => {
  return timeUnit < 10 ? `0${timeUnit}` : timeUnit.toString();
};

function receiveCurrentTime(): string {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedHours = formatTimeUnit(hours);
  const formattedMinutes = formatTimeUnit(minutes);

  return `${formattedHours}:${formattedMinutes}`;
}

export function receiveCurrentDate(): WeatherCurrentTime {
  const today = new Date();

  const days = daysMap[today.toDateString().slice(0, 3) as keyof typeof daysMap];
  const currentTime = receiveCurrentTime();

  const month = today.toDateString().slice(4).slice(0, 4);
  const number = today.toDateString().slice(8).slice(0, 2);
  const year = today.toDateString().slice(11);

  const formattedDate = `${currentTime} | ${number} ${month} ${year}`;

  return { days, dateNow: formattedDate };
}
