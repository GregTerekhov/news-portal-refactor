import { useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowPlug = () => {
  const { hasResults } = useFiltersRedux();
  const { errorAPI } = useNewsAPIRedux();
  const { allArchive, archiveHistoryLog, isLoadingDBData } = useDBRedux();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const { isHomeLoader, commonDBLoader } = useShowLoader();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  const is429ErrorAPI = errorAPI?.toString().includes('429');

  const commonPlug = rebuildedNews?.length === 0 || hasResults === 'empty';

  const isHomePlug = commonPlug || is429ErrorAPI!;
  const isArchivePlug = allArchive.length === 0 && archiveHistoryLog.length === 0;
  const showHomePlug = isHomeActive && isHomePlug && !isHomeLoader;
  const showFavouritesAndReadsPlug =
    (isFavoriteActive || isReadActive) && commonPlug && !commonDBLoader;
  const showArchivePlug = isArchiveActive && isArchivePlug && !isLoadingDBData;

  const shouldShowPlug = showHomePlug || showFavouritesAndReadsPlug || showArchivePlug;

  return { isHomePlug, commonPlug, shouldShowPlug };
};

export default useShowPlug;
