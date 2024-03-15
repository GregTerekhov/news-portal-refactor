import { useCallback } from 'react';

import { Position } from 'types';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import * as weather from '../weather';

const useWeatherCollector = () => {
  const isWeatherLoading = useAppSelector(weather.selectLoading);
  const currentWeather = useAppSelector(weather.selectPosition);
  const hourlyWeather = useAppSelector(weather.selectWeatherByHours);
  const weatherError = useAppSelector(weather.selectHasWeatherError);

  const dispatch = useAppDispatch();

  const getCurrentWeather = useCallback(
    (position: Position) => dispatch(weather.fetchWeather(position)),
    [dispatch],
  );

  const getHourlyWeather = useCallback(
    (position: Position) => dispatch(weather.fetchHourlyForecastWeather(position)),
    [dispatch],
  );

  return {
    isWeatherLoading,
    currentWeather,
    hourlyWeather,
    weatherError,
    getCurrentWeather,
    getHourlyWeather,
  };
};

export default useWeatherCollector;
