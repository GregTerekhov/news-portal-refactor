import useChooseRenderingNews from './useChooseRenderingNews';
import { ActiveLinks } from './commonTypes';

type ReadNewsContentHookProps = {
  activeLinks: ActiveLinks;
};

const useReadNewsContent = ({ activeLinks }: ReadNewsContentHookProps) => {
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const publishedDate = rebuildedNews
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  const uniqueDatesSet = new Set(publishedDate);
  const readNews = Array.from(uniqueDatesSet).sort().reverse();

  if (readNews) {
    return readNews as string[];
  }

  return null;
};

export default useReadNewsContent;
