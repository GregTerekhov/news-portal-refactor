import React, { FC } from 'react';

import type { PartialVotedNewsArray, VotedItem } from 'types';
import { useWeatherAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { Loader } from 'ui';
import WeatherBlock from '../WeatherBlock/WeatherBlock';
import { NewsItem } from './subcomponents';

interface NewsListProps {
  currentItems: PartialVotedNewsArray;
  currentPage?: number;
}

const NewsList: FC<Partial<NewsListProps>> = ({ currentItems, currentPage }) => {
  const { isWeatherLoading } = useWeatherAPIRedux();

  const { isFavoriteActive } = useActiveLinks();

  const newsListStyles = `${!isFavoriteActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : 'mb-0'} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`;

  const getNewsItemStyles = (index: number): string => {
    return `relative h-655px w-72 overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard md:h-700px md:w-353px lg:w-395px hg:w-442px ${
      index === 0 && 'md:col-start-1 md:row-start-1 lg:col-start-1'
    } ${index === 1 && 'lg:col-start-2 lg:row-start-1'}`;
  };

  return (
    <ul className={`${newsListStyles}`}>
      {currentPage && currentPage === 1 && (
        <li className='overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard max-md:h-515px md:col-start-2 lg:col-start-3'>
          {isWeatherLoading ? <Loader variant='element' /> : <WeatherBlock />}
        </li>
      )}
      {currentItems?.map((newsItem: Partial<VotedItem>, index: number) => (
        <li key={newsItem.newsUrl} className={getNewsItemStyles(index)}>
          <NewsItem liveNews={newsItem} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
