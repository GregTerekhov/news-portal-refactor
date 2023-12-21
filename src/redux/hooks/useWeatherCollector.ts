import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from './hooks';
import * as weather from '../weather';

const useWeatherCollector = () => {
  const isWeatherLoading = useAppSelector(weather.selectLoading);
  const currentWeather = useAppSelector(weather.selectPosition);
  const hourlyWeather = useAppSelector(weather.selectWeatherByHours);
  const weatherError = useAppSelector(weather.selectHasWeatherError);

  const dispatch = useAppDispatch();

  const getCurrentWeather = useCallback(
    (position: weather.Position) => dispatch(weather.fetchWeather(position)),
    [dispatch],
  );

  const getHourlyWeather = useCallback(
    (position: weather.Position) => dispatch(weather.fetchHourlyForecastWeather(position)),
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
