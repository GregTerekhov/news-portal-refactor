import { CONFIG } from 'config';

import { requestTemplate } from '../services';

import { HourlyWeatherData, Position, WeatherData } from 'types';

const BASE_URL_WEATHER = CONFIG.BASE_URL_WEATHER;
const API_KEY = CONFIG.WEATHER_API_KEY;

export const fetchWeather = requestTemplate<Position, WeatherData>(
  'weather/fetch',
  `${BASE_URL_WEATHER}/data/2.5/weather`,
  'get',
  { queryParams: { appid: API_KEY, units: 'metric' } },
);

export const fetchHourlyForecastWeather = requestTemplate<Position, HourlyWeatherData>(
  'weather/hourlyForecast',
  `${BASE_URL_WEATHER}/data/2.5/forecast`,
  'get',
  { queryParams: { appid: API_KEY, units: 'metric', cnt: 6 }, nestedObjectName: 'list' },
);
