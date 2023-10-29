import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from 'redux/newsAPI';

export const fetchNewswire: any = createAsyncThunk('newswire/fetch', async (category, _) => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=${API_KEY}`,
  );
  console.log(res.data.results);

  return res.data.results;
});
