import { useAppSelector } from 'redux/hooks';
import {
  // fetchHourlyForecastWeather,
  // fetchWeather,
  selectHasWeatherError,
  selectLoading,
  selectPosition,
  selectWeatherByHours,
} from 'redux/weather';

const useWeatherCollector = () => {
  const isWeatherLoading = useAppSelector(selectLoading);
  const currentWeather = useAppSelector(selectPosition);
  const hourlyWeather = useAppSelector(selectWeatherByHours);
  const weatherError = useAppSelector(selectHasWeatherError);

  // const dispatch = useAppDispatch();

  // const getCurrentWeather = dispatch(fetchWeather(position));
  // const getHourlyWeather = dispatch(fetchHourlyForecastWeather(position));

  return {
    isWeatherLoading,
    currentWeather,
    hourlyWeather,
    weatherError,
    // getCurrentWeather,
    // getHourlyWeather,
  };
};

export default useWeatherCollector;
