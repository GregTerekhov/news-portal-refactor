import React from 'react';
import { NewsItem, PlugImage, WeatherBlock } from 'components';

const HomePage = () => {
  return (
    <div>
      HomePage
      <NewsItem />
      <WeatherBlock />
      <PlugImage variant='page' />
    </div>
  );
};

export default HomePage;
