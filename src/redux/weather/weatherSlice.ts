import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from './weatherOperations';

type WeatherData = {
  name: string;
  main: {
    feels_like: number;
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  timezone: number;
  wind: {
    speed: number;
  };
};

type WeatherState = {
  isLoading: boolean;
  data: WeatherData;
  hasError: SerializedError | null;
};

const initialState = {
  data: {},
  isLoading: false,
  hasError: null,
} as WeatherState;

const weatherSlice: any = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.hasError = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default weatherSlice.reducer;
