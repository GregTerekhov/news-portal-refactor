import type { WeatherData, HourlyWeatherData } from 'types/weather';
import {
  convertPressure,
  convertTemperature,
  convertTimezone,
  convertUnixTimestampToHHMM,
  formatKmToMetre,
  getWindStrengthScale,
} from './utils';

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

export function getWeatherTodayObject(
  currentWeather: WeatherData,
  isCelsius?: boolean,
): DetailsTodayObject {
  const { main, weather, name, timezone, sys, visibility, wind } = currentWeather;

  return {
    currentTemperature: isCelsius
      ? convertTemperature(main?.temp, true)
      : convertTemperature(main?.temp, false),
    feelsLike: isCelsius
      ? `${convertTemperature(main?.feels_like, true)} C`
      : `${convertTemperature(main?.feels_like, false)} F`,
    prevailingWeather: weather?.[0].main ?? '',
    location: name ?? '',
    timezone: convertTimezone(timezone),
    iconWeather: weather?.[0].icon,
    iconAlt: weather?.[0].description,
    humidityPercent: main?.humidity,
    pressureMmHg: convertPressure(main?.pressure),
    pressureHpa: main?.pressure,
    sunriseTime: convertUnixTimestampToHHMM(sys?.sunrise),
    sunsetTime: convertUnixTimestampToHHMM(sys?.sunset),
    visibility: formatKmToMetre(visibility),
    windSpeed: wind?.speed,
    beaufortScale: getWindStrengthScale(wind?.speed),
  };
}

export function getWeatherHoursObject(
  currentWeather: HourlyWeatherData,
  isCelsius?: boolean,
): DetailsHoursObject {
  const { dt, main, weather, wind } = currentWeather;

  return {
    timeScale: dt,
    convertedTimeScale: convertUnixTimestampToHHMM(dt),
    mainTemperature: isCelsius
      ? `${convertTemperature(main?.temp, true)} C`
      : `${convertTemperature(main?.temp, false)} F`,
    iconWeather: weather?.[0]?.icon,
    iconAlt: weather?.[0]?.description,
    humidityPercent: main?.humidity,
    pressureMmHg: convertPressure(main?.pressure),
    windSpeed: wind?.speed,
  };
}
