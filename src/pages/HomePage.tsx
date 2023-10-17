import React, { useState, useEffect } from 'react';
import { Loader, NewsItem, WeatherBlock } from 'components';
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
      {popularData ? (
        <ul className='preMd:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10'>
          <li
            className={`shadow-card overflow-hidden rounded-[10px] darkMode:shadow-darkCard transition-transform duration-500 hover:scale-105 md:col-start-2 lg:col-start-3`}
          >
            <WeatherBlock />
          </li>

          {popularData?.results.map((newsItem: any, index: number) => {
            return (
              <li
                key={newsItem.id}
                className={`relative w-72 md:w-[353px] lg:w-[395px] shadow-card overflow-hidden rounded-[10px] darkMode:shadow-darkCard transition-transform duration-500 hover:scale-105 ${
                  index === 0 && 'md:col-start-1 md:row-start-1 lg:col-start-1'
                } ${index === 1 && 'lg:col-start-2 lg:row-start-1'}`}
              >
                <NewsItem data={newsItem} />
              </li>
            );
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
    // <PlugImage variant='page' />
  );
};

export default HomePage;
