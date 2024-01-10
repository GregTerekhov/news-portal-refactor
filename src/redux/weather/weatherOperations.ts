import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CONFIG } from 'config';

import { AppDispatch, RootState } from '../store';
import { BASE_URL_WEATHER } from '../services';

import { HourlyWeatherData, WeatherData } from 'types';

const API_KEY = CONFIG.WEATHER_API_KEY;

export interface Position {
  latitude: number;
  longitude: number;
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

export const fetchWeather = createAppAsyncThunk<WeatherData, Position>(
  `weather/fetch`,
  async (position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL_WEATHER}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );
      return response.data as WeatherData;
    } catch (error: any) {
      console.log('error', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchHourlyForecastWeather = createAppAsyncThunk(
  `weather/hourlyForecast`,
  async (position: Position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL_WEATHER}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=6&units=metric&appid=${API_KEY}`,
      );
      return response.data.list as HourlyWeatherData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
