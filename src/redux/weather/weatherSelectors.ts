import type { RootState } from 'reduxStore/store';

export const selectLoading = (state: RootState) => state.weather.isLoading;
export const selectPosition = (state: RootState) => state.weather.data;
export const selectWeatherByHours = (state: RootState) => state.weather.weatherByHour;
export const selectHasWeatherError = (state: RootState) => state.weather.hasError;
