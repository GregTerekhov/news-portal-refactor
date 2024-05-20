import { useEffect, useMemo, useState } from 'react';

import { useWindowWidthContext } from 'contexts';
import { useChooseRenderingNews } from 'hooks';

const MOBILE_NEWS_DISPLAYED_COUNT = 5;
const WIDESCREEN_NEWS_DISPLAYED_COUNT = 6;

const useInfiniteScroll = () => {
  const [totalNewsCount, setTotalNewsCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isSmallScreens } = useWindowWidthContext();

  const { rebuiltNews } = useChooseRenderingNews();

  useEffect(() => {
    if (rebuiltNews?.length > 0) {
      setTotalNewsCount(rebuiltNews.length);
    }
  }, [rebuiltNews]);

  const initialDisplayCount = useMemo(() => {
    if (isSmallScreens) {
      return MOBILE_NEWS_DISPLAYED_COUNT;
    } else {
      return WIDESCREEN_NEWS_DISPLAYED_COUNT;
    }
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
        prevCount +
        (isSmallScreens ? MOBILE_NEWS_DISPLAYED_COUNT : WIDESCREEN_NEWS_DISPLAYED_COUNT),
    );

    setIsLoadingMore(false);
  };

  const displayedNews = rebuiltNews?.slice(0, displayedCount);

  return { displayedNews, handleLoadMore };
};

export default useInfiniteScroll;
