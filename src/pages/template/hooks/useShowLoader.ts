import { useDB, useFiltersAction, useNewsAPI } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

const useShowLoader = () => {
  const { hasResults } = useFiltersAction();
  const { isLoadingAPIData } = useNewsAPI();
  const { isLoadingDBData } = useDB();
  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = useActiveLinks();

  const commonDBLoader = isLoadingDBData || hasResults === 'loading';

  const isHomeLoader = isLoadingAPIData || commonDBLoader;
  const showHomeLoader = isHomeActive && isHomeLoader;
  const showFavouritesAndReadsLoader = (isFavoriteActive || isReadActive) && commonDBLoader;
  const showArchiveLoader = isArchiveActive && isLoadingDBData;

  const shouldShowLoader = showHomeLoader || showFavouritesAndReadsLoader || showArchiveLoader;

  return { commonDBLoader, isHomeLoader, shouldShowLoader };
};

export default useShowLoader;
