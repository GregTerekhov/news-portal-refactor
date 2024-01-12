import axios from 'axios';

import { CONFIG } from 'config';

import { BASE_URL_WEATHER, createAppAsyncThunk } from '../services';

import { HourlyWeatherData, Position, WeatherData } from 'types';

const API_KEY = CONFIG.WEATHER_API_KEY;

export const fetchWeather = createAppAsyncThunk<WeatherData, Position>(
  `weather/fetch`,
  async (position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get<WeatherData>(
        `${BASE_URL_WEATHER}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );
      return response.data;
    } catch (error: any) {
      console.log('error', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchHourlyForecastWeather = createAppAsyncThunk<HourlyWeatherData, Position>(
  `weather/hourlyForecast`,
  async (position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL_WEATHER}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=6&units=metric&appid=${API_KEY}`,
      );
      return response.data.list;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
