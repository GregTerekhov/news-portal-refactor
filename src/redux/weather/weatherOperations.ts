import { Config, CONFIG } from 'config';

import { requestTemplate } from '../services';

import {
  HTTPMethods,
  NestedAPIObject,
  OperationName,
  Routes,
  type HourlyWeatherData,
  type Position,
  type WeatherData,
} from 'types';

const { WEATHER_API_KEY }: Config = CONFIG;

export const fetchWeather = requestTemplate<Position, WeatherData>(
  OperationName.CurrentWeather,
  Routes.CurrentWeather,
  HTTPMethods.GET,
  { queryParams: { appid: WEATHER_API_KEY, units: 'metric' } },
);

export const fetchHourlyForecastWeather = requestTemplate<Position, HourlyWeatherData>(
  OperationName.WeatherByHours,
  Routes.WeatherByHours,
  HTTPMethods.GET,
  {
    queryParams: { appid: WEATHER_API_KEY, units: 'metric', cnt: 6 },
    nestedObjectName: NestedAPIObject.WeatherByHour,
  },
);
