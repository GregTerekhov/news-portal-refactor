import type { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => state.weather.isLoading;
export const selectPosition = (state: RootState) => state.weather.data;
export const selectHasError = (state: RootState) => state.weather.hasError;
