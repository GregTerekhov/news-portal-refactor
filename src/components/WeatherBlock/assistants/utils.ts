import type { HourlyWeatherData, WeatherData } from 'types';
import { beaufortScale, daysMap, TimezoneOffset, zoneList } from './constants';

type WeatherCurrentTime = {
  days: string;
  dateNow: string;
};

type DetailsTodayObject = {
  currentTemperature: string;
  feelsLike: string;
  prevailingWeather: string;
  location: string;
  timezone: string | undefined;
  iconWeather: string;
  iconAlt: string;
  humidityPercent: number;
  pressureMmHg: number;
  pressureHpa: number;
  sunriseTime: string;
  sunsetTime: string;
  visibility: number;
  windSpeed: number;
  beaufortScale: string;
};

type DetailsHoursObject = {
  timeScale: number;
  convertedTimeScale: string;
  mainTemperature: string;
  iconWeather: string;
  iconAlt: string;
  humidityPercent: number;
  pressureMmHg: number;
  windSpeed: number;
};

function convertTimezone(data: number): string | undefined {
  const key = String(data) as TimezoneOffset;

  return zoneList[key];
}

//Функція конвертації км в метри
function formatKmToMetre(distance: number): number {
  return distance / 1000;
}
//Виведення значення сили ветра за шкалою Бофорта
function getWindStrengthScale(windSpeed: number): string {
  let interval;

  if (windSpeed) {
    // Знаходимо відповідний інтервал вітрової швидкості в шкалі Бофорта
    interval = beaufortScale.find((range) => windSpeed >= range.min && windSpeed <= range.max);
  }

  // Повертаємо відповідну іконку або значення за замовчуванням
  return interval ? interval?.scale : '';
}

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

function convertUnixTimestampToHHMM(unixTimestamp: number): string {
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

//Функція виведення значення атмосферного тиску
function hPaToMmHg(hPa: number): number {
  const mmHg = hPa * 0.75006;
  return Math.floor(mmHg);
}

//Функція конвертації температур (Цельсій <=> Фаренгейт)
const convertTemperature = (temp: number, isCelsius: boolean): string => {
  return isCelsius && temp
    ? Math.round(temp) + '\u00b0'
    : Math.round((temp * 9) / 5 + 32) + '\u00b0';
};

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

export function getWeatherTodayObject(
  currentWeather: WeatherData,
  isCelsius?: boolean,
): DetailsTodayObject {
  return {
    currentTemperature: isCelsius
      ? convertTemperature(currentWeather?.main?.temp, true)
      : convertTemperature(currentWeather?.main?.temp, false),
    feelsLike: isCelsius
      ? convertTemperature(currentWeather?.main?.feels_like, true) + 'C'
      : convertTemperature(currentWeather?.main?.feels_like, false) + 'F',
    prevailingWeather: currentWeather?.weather?.[0]?.main ?? '',
    location: currentWeather?.name ?? '',
    timezone: convertTimezone(currentWeather?.timezone),
    iconWeather: currentWeather?.weather?.[0]?.['icon'],
    iconAlt: currentWeather?.weather?.[0]?.['description'],
    humidityPercent: currentWeather?.main?.humidity,
    pressureMmHg: hPaToMmHg(currentWeather?.main?.pressure),
    pressureHpa: currentWeather?.main?.pressure,
    sunriseTime: convertUnixTimestampToHHMM(currentWeather?.sys?.sunrise),
    sunsetTime: convertUnixTimestampToHHMM(currentWeather?.sys?.sunset),
    visibility: formatKmToMetre(currentWeather?.visibility),
    windSpeed: currentWeather?.wind?.speed,
    beaufortScale: getWindStrengthScale(currentWeather?.wind?.speed),
  };
}

export function getWeatherHoursObject(
  currentWeather: HourlyWeatherData,
  isCelsius?: boolean,
): DetailsHoursObject {
  return {
    timeScale: currentWeather?.dt,
    convertedTimeScale: convertUnixTimestampToHHMM(currentWeather?.dt),
    mainTemperature: isCelsius
      ? convertTemperature(currentWeather?.main?.temp, true) + 'C'
      : convertTemperature(currentWeather?.main?.temp, false) + 'F',
    iconWeather: currentWeather?.weather?.[0]?.['icon'],
    iconAlt: currentWeather?.weather?.[0]?.description,
    humidityPercent: currentWeather?.main?.humidity,
    pressureMmHg: hPaToMmHg(currentWeather?.main?.pressure),
    windSpeed: currentWeather?.wind?.speed,
  };
}
