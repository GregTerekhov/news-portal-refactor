import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org';

type Position = {
  latitude: number;
  longitude: number;
};

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

export const fetchWeather = createAsyncThunk(
  `weather/fetch`,
  async (position: Position, { rejectWithValue }) => {
    const { latitude, longitude } = position;
    try {
      const response = await axios.get(
        `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=50fae40a64fcd40464e14d0d20ee5d02`,
      );
      // const { data } = await res;
      return response.data as WeatherData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
