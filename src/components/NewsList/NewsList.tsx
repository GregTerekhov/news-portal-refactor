import React, { FC } from 'react';

import { useWeatherAPI } from 'reduxStore/hooks';

import { PartialVotedNewsArray, VotedItem } from 'types';

import { Loader } from 'ui';
import WeatherBlock from '../WeatherBlock/WeatherBlock';

import { NewsItem } from './subcomponents';

interface NewsListProps {
  currentItems: PartialVotedNewsArray;
  currentPage?: number;
}

const NewsList: FC<Partial<NewsListProps>> = ({ currentItems, currentPage }) => {
  const { isWeatherLoading } = useWeatherAPI();

  return (
    <ul className='mb-10 max-md:space-y-7 md:mb-12 md:grid md:grid-cols-2 md:gap-[30px] lg:mb-[60px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10'>
      {currentPage && currentPage === 1 && (
        <li className='max-md:h-515px overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard md:col-start-2 lg:col-start-3'>
          {isWeatherLoading ? <Loader variant='element' /> : <WeatherBlock />}
        </li>
      )}
      {currentItems &&
        currentItems.map((newsItem: Partial<VotedItem>, index: number) => (
          <li
            key={newsItem.newsUrl}
            className={`md:w-353px hg:w-442px h-655px md:h-700px relative w-72 overflow-hidden rounded-[10px] shadow-card transition-colors duration-500 dark:shadow-darkCard lg:w-395px ${
              index === 0 && 'md:col-start-1 md:row-start-1 lg:col-start-1'
            } ${index === 1 && 'lg:col-start-2 lg:row-start-1'}`}
          >
            <NewsItem liveNews={newsItem} />
          </li>
        ))}
    </ul>
  );
};

export default NewsList;
