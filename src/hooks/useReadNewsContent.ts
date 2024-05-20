import useChooseRenderingNews from './useChooseRenderingNews';
import { compareDates } from 'helpers';

const useReadNewsContent = () => {
  const { rebuiltNews } = useChooseRenderingNews();

  if (rebuiltNews?.length === 0) return [];

  const publishedDate = rebuiltNews
    .map((news) => news?.publishDate)
    .filter((date) => date !== undefined);

  const uniqueDateList = new Set(publishedDate);

  return Array.from(uniqueDateList).sort(compareDates).reverse();
};

export default useReadNewsContent;
