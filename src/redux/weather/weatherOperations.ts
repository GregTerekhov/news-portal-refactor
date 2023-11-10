import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HourlyWeatherData, WeatherData } from 'types';

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = `50fae40a64fcd40464e14d0d20ee5d02`;

type Position = {
  latitude: number;
  longitude: number;
};

export const fetchWeather = createAsyncThunk(
  `weather/fetch`,
  async (position: Position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );
      // console.log(response.data);
      return response.data as WeatherData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchHourlyForecastWeather = createAsyncThunk(
  `weather/hourlyForecast`,
  async (position: Position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=6&units=metric&appid=${API_KEY}`,
      );
      return response.data.list as HourlyWeatherData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
