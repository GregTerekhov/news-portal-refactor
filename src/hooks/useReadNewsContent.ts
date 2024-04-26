import useChooseRenderingNews from './useChooseRenderingNews';

import { compareDates } from 'helpers';
import useActiveLinks from './useActiveLinks';

const useReadNewsContent = () => {
  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  if (rebuiltNews?.length === 0) return;

  const publishedDate: string[] = rebuiltNews
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined);

  const readNews = Array.from(new Set(publishedDate)).sort(compareDates).reverse();

  return readNews;
};

export default useReadNewsContent;
