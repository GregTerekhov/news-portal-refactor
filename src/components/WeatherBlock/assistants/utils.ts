import { TimezoneOffset, zoneList } from './constants';

type WeatherCurrentTime = {
  days: string;
  dateNow: string;
};

export function convertUnixTimestampToHHMM(unixTimestamp: number): string {
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

export function convertTimezone(data: number): string | undefined {
  const key = String(data) as TimezoneOffset;

  return zoneList[key];
}

//Функція виведення значення атмосферного тиску
export function hPaToMmHg(hPa: number): number {
  const mmHg = hPa * 0.75006;
  const formattedMmHg = Math.floor(mmHg);

  return formattedMmHg;
}

//Функція конвертації км в метри
export function formatKmToMetre(distance: number): number {
  return distance / 1000;
}
//Виведення значення сили ветра за шкалою Бофорта
export function getWindStrengthScale(windSpeed: number): string {
  let interval;
  // Шкала Бофорта з відповідними інтервалами швидкостей вітру
  const beaufortScale = [
    { min: 0, max: 0.2, scale: '0' }, // Штиль
    { min: 0.3, max: 1.5, scale: '1' }, // Легкий вітер
    { min: 1.6, max: 3.3, scale: '2' }, // Слабкий вітер
    { min: 3.4, max: 5.4, scale: '3' }, // Слабкий бриз
    { min: 5.5, max: 7.9, scale: '4' }, // Слабий бриз
    { min: 8.0, max: 10.7, scale: '5' }, // Помірний бриз
    { min: 10.8, max: 13.8, scale: '6' }, // Помірний вітер
    { min: 13.9, max: 17.1, scale: '7' }, // Сильний вітер
    { min: 17.2, max: 20.7, scale: '8' }, // Сильний вітер (шторм)
    { min: 20.8, max: 24.4, scale: '9' }, // Сильний вітер (шторм)
    { min: 24.5, max: 28.4, scale: '10' }, // Шторм
    { min: 28.5, max: 32.6, scale: '11' }, // Сильний шторм
    { min: 32.7, max: Number.MAX_SAFE_INTEGER, scale: '12' }, // Ураган
  ];

  if (windSpeed) {
    // Знаходимо відповідний інтервал вітрової швидкості в шкалі Бофорта
    interval = beaufortScale.find((range) => windSpeed >= range.min && windSpeed <= range.max);
  }

  // Повертаємо відповідну іконку або значення за замовчуванням
  return interval ? interval?.scale : '';
}

function receiveCurrentTime(): string {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formatTimeUnit = (timeUnit: number): string => {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit.toString();
  };

  const formattedHours = formatTimeUnit(hours);
  const formattedMinutes = formatTimeUnit(minutes);

  return `${formattedHours}:${formattedMinutes}`;
}

export function receiveCurrentDate(): WeatherCurrentTime {
  // Визначаємо повну назву дня за допомогою мапи
  const daysMap = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  const today = new Date();

  const days = daysMap[today.toDateString().slice(0, 3) as keyof typeof daysMap];
  const currentTime = receiveCurrentTime();
  const month = today.toDateString().slice(4).slice(0, 4);
  const number = today.toDateString().slice(8).slice(0, 2);
  const year = today.toDateString().slice(11);

  const formattedDate = `${currentTime} | ${number} ${month} ${year}`;

  return { days, dateNow: formattedDate };
}

//Функція конвертації температур (Цельсій <=> Фаренгейт)
export const convertTemperature = (temp: number, isCelsius: boolean): string => {
  return isCelsius && temp
    ? Math.round(temp) + '\u00b0'
    : Math.round((temp * 9) / 5 + 32) + '\u00b0';
};
