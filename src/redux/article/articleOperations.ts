import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from 'redux/newsAPI';

export const fetchArticle: any = createAsyncThunk('article/fetch', async (query, _) => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`,
  );

  console.log(res.data.response.docs);

  return res.data.response.docs;
});
