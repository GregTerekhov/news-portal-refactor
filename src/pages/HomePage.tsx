import React, { useState, useEffect } from 'react';
import { NewsItem, WeatherBlock } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularNews, popularSelectors } from 'redux/favourite';

const HomePage = () => {
  const [getPop, setGetPop] = useState<boolean>(false);
  const dispatch = useDispatch();
  const popularData = useSelector(popularSelectors);

  useEffect(() => {
    if (!getPop) {
      console.log(`GET POP`);
      dispatch(fetchPopularNews());
      setGetPop(true);
    }
  }, []);

  return (
    <div>
      HomePage
      <ul className='grid grid-cols-1 gap-7'>
        {popularData?.results.map((newsItem: any) => {
          return <NewsItem data={newsItem} key={newsItem.id} />;
        })}
      </ul>
      <WeatherBlock />
    </div>
  );
};

export default HomePage;
