import React, { FC } from 'react';

import type { PartialVotedNewsArray, VotedItem } from 'types';
import { useWeatherAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { Loader } from 'ui';
import WeatherBlock from '../WeatherBlock/WeatherBlock';
import { NewsItem } from './subcomponents';

import { commonItemStyles, getNewsItemStyles, newsListStyles } from './assistants';

interface NewsListProps {
  currentItems: PartialVotedNewsArray;
  currentPage?: number;
}

const NewsList: FC<Partial<NewsListProps>> = ({ currentItems, currentPage }) => {
  const { isWeatherLoading } = useWeatherAPIRedux();
  const { isFavoriteActive } = useActiveLinks();

  const listClass = newsListStyles(isFavoriteActive);

  return (
    <ul className={listClass}>
      {currentPage && currentPage === 1 && (
        <li className={`${commonItemStyles} max-md:h-515px md:col-start-2 lg:col-start-3`}>
          {isWeatherLoading ? <Loader variant='element' /> : <WeatherBlock />}
        </li>
      )}
      {Array.isArray(currentItems) &&
        currentItems?.map((newsItem: Partial<VotedItem>, index: number) => (
          <li key={newsItem.newsUrl} className={getNewsItemStyles(index)}>
            <NewsItem liveNews={newsItem} />
          </li>
        ))}
    </ul>
  );
};

export default NewsList;
