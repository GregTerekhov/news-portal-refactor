import type { PartialVotedNewsArray } from 'types';
import { useDBRedux, useFiltersRedux } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import { formatSortedDate } from 'helpers';

const useSortNews = () => {
  const { getFilteredNews, sortResults } = useFiltersRedux();
  const { allFavourites, allReads } = useDBRedux();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  const handleSort = (order: string): void => {
    if (!rebuiltNews || rebuiltNews.length === 0) return;

    sortResults(true);

    //Створення нового масива об'єктів для сортованих новин в залежності від локації
    let sortedNews: PartialVotedNewsArray = [];

    if (isHomeActive) {
      sortedNews = [...rebuiltNews];
    } else if (isFavoriteActive) {
      sortedNews = [...allFavourites];
    } else if (isReadActive) {
      sortedNews = [...allReads];
    }

    //Сортування нового масива об'єктів новин
    sortedNews.sort((a, b) => {
      const dateA = formatSortedDate(a.publishDate);
      const dateB = formatSortedDate(b.publishDate);

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    //Зміна глобального стану фільтрованих новин
    getFilteredNews(sortedNews);
  };

  return { handleSort };
};

export default useSortNews;