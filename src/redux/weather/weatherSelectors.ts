import type { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => (state as any).weather.isLoading;
export const selectPosition = (state: RootState) => (state as any).weather.data;
export const selectHasError = (state: RootState) => (state as any).weather.hasError;
