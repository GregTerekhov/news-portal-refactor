import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';

import { ToastStatus, ToastVariant } from 'types';
import { useActiveLinks } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowToast = () => {
  const activeLinks = useActiveLinks();

  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = activeLinks;
  const { errorAPI, newsByKeyword, newsByCategory, newsByDate } = useNewsAPI();
  const { authError } = useAuthRedux();
  const { allFavourites, allReads, dbSuccessMessage } = useDB();
  const { isHomeLoader, commonDBLoader } = useShowLoader();

  const additionalRequests =
    (newsByKeyword && newsByKeyword.length > 0) ||
    (newsByCategory && newsByCategory.length > 0) ||
    (newsByDate && newsByDate.length > 0);

  const homeToastError = !!authError || !!errorAPI;
  const homeToastInfo = !isHomeLoader && additionalRequests;
  const favouritesToastInfo = isFavoriteActive && !commonDBLoader && allFavourites?.length > 0;
  const readsToastInfo = isReadActive && !commonDBLoader && allReads?.length > 0;
  const archiveToast = isArchiveActive && dbSuccessMessage === 'Remove news success';

  const showHomeToast = isHomeActive && (homeToastError || homeToastInfo);

  const shouldShowToast = showHomeToast || favouritesToastInfo || readsToastInfo || archiveToast;

  let statusToast: ToastStatus;
  let toastType: ToastVariant;

  switch (true) {
    case isHomeActive && homeToastError:
      statusToast = 'error';
      toastType = 'interactive';
      break;
    case isHomeActive && homeToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case isFavoriteActive && favouritesToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case isReadActive && readsToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case isArchiveActive && archiveToast:
      statusToast = 'success';
      toastType = 'interactive';
      break;

    default:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
  }

  return { shouldShowToast, statusToast, toastType };
};

export default useShowToast;
