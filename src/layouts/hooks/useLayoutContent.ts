import { ErrorCase } from 'types';

import { useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

export const useLayoutContent = () => {
  const { errorAPI } = useNewsAPIRedux();
  const { allFavourites, allReads, isLoadingDBData } = useDBRedux();

  const { isNotMobile } = useWindowWidthContext();

  const {
    isAboutUs,
    isArchiveActive,
    isErrorPage,
    isFavoriteActive,
    isHomeActive,
    isReadActive,
    isDevelopmentActive,
  } = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews();

  const is429ErrorAPI = errorAPI?.toString().includes(ErrorCase.TooManyRequest.toString()) ?? false;

  const shouldShowPageScrollController = (): boolean =>
    (isNotMobile && isHomeActive && rebuiltNews?.length > 0) ||
    (isNotMobile && isFavoriteActive && allFavourites?.length >= 8);

  const shouldShowFilterManager = (): boolean =>
    (isHomeActive && !is429ErrorAPI) ||
    (isFavoriteActive && !!allFavourites?.length) ||
    (isReadActive && !!allReads?.length);

  const isFullHeightSection = (): boolean =>
    isHomeActive ||
    (isFavoriteActive && !!allFavourites?.length) ||
    (isFavoriteActive && !isLoadingDBData) ||
    isAboutUs ||
    isErrorPage;

  const shouldRenderLargeSection = (): boolean =>
    isArchiveActive ||
    isFavoriteActive ||
    isReadActive ||
    isDevelopmentActive ||
    (isHomeActive && !!is429ErrorAPI);

  const shouldShowThemeSwitcher = (): boolean => (!isNotMobile && !isErrorPage) || isErrorPage;

  return {
    isPageScrollController: shouldShowPageScrollController(),
    isFilterManager: shouldShowFilterManager(),
    isFullHeight: isFullHeightSection(),
    isLargeSection: shouldRenderLargeSection(),
    isThemeSwitcher: shouldShowThemeSwitcher(),
  };
};

export default useLayoutContent;
