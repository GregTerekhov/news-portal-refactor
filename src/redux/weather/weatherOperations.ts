import { CONFIG } from 'config';

import { requestTemplate } from '../services';

import type { HourlyWeatherData, Position, WeatherData } from 'types';

const API_KEY = CONFIG.WEATHER_API_KEY;

export const fetchWeather = requestTemplate<Position, WeatherData>(
  'weather/fetch',
  '/data/2.5/weather',
  'get',
  { queryParams: { appid: API_KEY, units: 'metric' } },
);

export const fetchHourlyForecastWeather = requestTemplate<Position, HourlyWeatherData>(
  'weather/hourlyForecast',
  '/data/2.5/forecast',
  'get',
  { queryParams: { appid: API_KEY, units: 'metric', cnt: 6 }, nestedObjectName: 'list' },
);
