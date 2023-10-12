import React from 'react';
import { Calendar, Filters, NewsItem, WeatherBlock } from 'components';

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
