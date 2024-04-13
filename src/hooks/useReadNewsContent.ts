import useChooseRenderingNews from './useChooseRenderingNews';

import { compareDates } from 'helpers';
import useActiveLinks from './useActiveLinks';

const useReadNewsContent = () => {
  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  const publishedDate = rebuiltNews
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
