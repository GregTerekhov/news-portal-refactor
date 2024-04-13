import { useEffect, useMemo, useState } from 'react';

import { useWindowWidthContext } from 'contexts';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';

const MOBILE_NEWS_DISPLAYED_COUNT = 5;
const NOT_MOBILE_NEWS_DISPLAYED_COUNT = 6;

const useInfiniteScroll = () => {
  const [totalNewsCount, setTotalNewsCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { isMobile, isNotMobile } = useWindowWidthContext();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  useEffect(() => {
    if (rebuiltNews) {
      setTotalNewsCount(rebuiltNews.length);
    }
  }, [rebuiltNews]);

  const initialDisplayCount = useMemo(() => {
    if (isMobile) return MOBILE_NEWS_DISPLAYED_COUNT;
    if (isNotMobile) return NOT_MOBILE_NEWS_DISPLAYED_COUNT;

    return 0;
  }, []);

  const [displayedCount, setDisplayedCount] = useState<number>(initialDisplayCount);

  const hasMoreNews = useMemo<boolean>(() => {
    return totalNewsCount > displayedCount;
  }, [totalNewsCount, displayedCount]);

  const handleLoadMore = (): void => {
    if (!hasMoreNews || isLoadingMore) return;

    setIsLoadingMore(true);

    setDisplayedCount(
      (prevCount) =>
        prevCount + (isMobile ? MOBILE_NEWS_DISPLAYED_COUNT : NOT_MOBILE_NEWS_DISPLAYED_COUNT),
    );

    setIsLoadingMore(false);
  };

  const displayedNews = rebuiltNews?.slice(0, displayedCount);

  return { displayedNews, handleLoadMore };
};

export default useInfiniteScroll;
