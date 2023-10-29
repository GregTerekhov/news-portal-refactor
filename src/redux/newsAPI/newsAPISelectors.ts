import type { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => (state as any).popular.isLoading;
export const selectPopular = (state: RootState) => (state as any).popular.incomingData;
export const selectHasError = (state: RootState) => (state as any).popular.hasError;
