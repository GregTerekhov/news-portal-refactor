import { Calendar, Filters, NewsItem, WeatherBlock } from 'components';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      HomePage
      <Filters />
      <Calendar />
      <NewsItem />
      <WeatherBlock />
    </div>
  );
};

export default HomePage;
