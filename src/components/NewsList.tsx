import React from 'react';
import NewsItem from './NewsItem';
import WeatherBlock from './WeatherBlock';
import { PartialPopularNewsArray } from 'types';

interface NewsListProps {
  currentItems: PartialPopularNewsArray;
  currentPage: number;
}

const NewsList: React.FC<Partial<NewsListProps>> = ({ currentItems, currentPage }) => {
  return (
    <ul className='max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10 mb-10 md:mb-12 lg:mb-[60px]'>
      {currentPage && currentPage === 1 && (
        <li
          className={`shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-transform duration-500 hover:scale-105 md:col-start-2 lg:col-start-3`}
        >
          <WeatherBlock />
        </li>
      )}
      {currentItems &&
        currentItems.map((newsItem: any, index: number) => (
          <li
            key={newsItem.id}
            className={`relative w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[630px] md:h-[675px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-transform duration-500 hover:scale-105 ${
              index === 0 && 'md:col-start-1 md:row-start-1 lg:col-start-1'
            } ${index === 1 && 'lg:col-start-2 lg:row-start-1'}`}
          >
            <NewsItem data={newsItem} />
          </li>
        ))}
    </ul>
  );
};

export default NewsList;
