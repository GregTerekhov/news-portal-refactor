import { useDB } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import useShowLoader from './useShowLoader';
import useShowPlug from './useShowPlug';

const useShowContent = () => {
  const activeLinks = useActiveLinks();
  const { isHomeLoader, commonDBLoader } = useShowLoader();
  const { isHomePlug, commonPlug } = useShowPlug();
  const { allArchive, isLoadingDBData } = useDB();

  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = activeLinks;

  const showHomeContent = isHomeActive && !isHomeLoader && !isHomePlug;
  const showFavouritesContent =
    (isFavoriteActive || isReadActive) && !commonDBLoader && !commonPlug;
  const showArchiveContent = isArchiveActive && !isLoadingDBData && allArchive?.length > 0;

  const shouldShowContent = showHomeContent || showFavouritesContent || showArchiveContent;

  return { shouldShowContent };
};

export default useShowContent;
