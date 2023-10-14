import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.openweathermap.org';

export const fetchWeather: any = createAsyncThunk(
  `weather/fetch`,
  async (position: any, thunkAPI) => {
    const { latitude, longitude } = position;
    try {
      const res: any = await axios.get(
        `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50fae40a64fcd40464e14d0d20ee5d02`,
      );
      const { data } = await res;

      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// const weatherOperations = {
//   fetchWeather,
// };

// export default weatherOperations;
