import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  Position,
  fetchHourlyForecastWeather,
  fetchWeather,
  selectHasWeatherError,
  selectLoading,
  selectPosition,
  selectWeatherByHours,
} from 'reduxStore/weather';

const useWeatherCollector = () => {
  const isWeatherLoading = useAppSelector(selectLoading);
  const currentWeather = useAppSelector(selectPosition);
  const hourlyWeather = useAppSelector(selectWeatherByHours);
  const weatherError = useAppSelector(selectHasWeatherError);

  const dispatch = useAppDispatch();

  const getCurrentWeather = useCallback(
    (position: Position) => dispatch(fetchWeather(position)),
    [dispatch],
  );

  const getHourlyWeather = useCallback(
    (position: Position) => dispatch(fetchHourlyForecastWeather(position)),
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
