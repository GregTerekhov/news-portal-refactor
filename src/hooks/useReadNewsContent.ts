import useChooseRenderingNews from './useChooseRenderingNews';
import { ActiveLinks } from './commonTypes';

import { compareDates } from 'helpers';

const useReadNewsContent = (activeLinks: ActiveLinks) => {
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  const publishedDate = rebuildedNews
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Створення списка унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  const readNews = Array.from(uniqueDatesSet).sort(compareDates).reverse();

  if (readNews) {
    return readNews as string[];
  }

  return null;
};

export default useReadNewsContent;
