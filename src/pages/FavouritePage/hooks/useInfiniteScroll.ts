import { useWindowWidthContext } from 'contexts/WindowWidthProvider';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import { useMemo, useState } from 'react';

const MOBILE_NEWS_DISPLAYED_COUNT = 5;
const NOT_MOBILE_NEWS_DISPLAYED_COUNT = 6;

const useInfiniteScroll = () => {
  const { isMobile, isNotMobile } = useWindowWidthContext();

  const initialDisplayCount = useMemo(() => {
    if (isMobile) return MOBILE_NEWS_DISPLAYED_COUNT;
    if (isNotMobile) return NOT_MOBILE_NEWS_DISPLAYED_COUNT;

    return 0;
  }, []);

  const [displayedCount, setDisplayedCount] = useState<number>(initialDisplayCount);

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  const displayedNews = rebuildedNews?.slice(0, displayedCount);

  const handleLoadMore = (): void => {
    setDisplayedCount(
      (prevCount) =>
        prevCount + (isMobile ? MOBILE_NEWS_DISPLAYED_COUNT : NOT_MOBILE_NEWS_DISPLAYED_COUNT),
    );
  };
  return { displayedNews, handleLoadMore };
};

export default useInfiniteScroll;
