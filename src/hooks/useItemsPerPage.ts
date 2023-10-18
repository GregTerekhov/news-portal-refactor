import { useEffect, useState } from 'react';
import { useWindowWidth } from './useWindowWidth';

const useItemsPerPage = (): number => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);

  useEffect(() => {
    if (breakpointsForMarkup?.isDesktop) {
      setItemsPerPage(8);
    } else if (breakpointsForMarkup?.isTablet) {
      setItemsPerPage(7);
    } else {
      setItemsPerPage(4);
    }
  }, []);

  return itemsPerPage;
};

export default useItemsPerPage;
