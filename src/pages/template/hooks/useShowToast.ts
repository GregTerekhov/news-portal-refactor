import { useAuthRedux, useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import type { ToastStatus, ToastVariant } from 'types';
import { useActiveLinks } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowToast = () => {
  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = useActiveLinks();
  const { filteredNews } = useFiltersRedux();

  const { errorAPI, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { authError, statusMessage } = useAuthRedux();
  const { allFavourites, allReads, dbSuccessMessage } = useDBRedux();
  const { isHomeLoader, commonDBLoader } = useShowLoader();

  const additionalRequests =
    (newsByKeyword && newsByKeyword.length > 0) ||
    (newsByCategory && newsByCategory.length > 0) ||
    (newsByDate && newsByDate.length > 0);

  const homeToastSuccess =
    statusMessage === 'Email sent successfully' ||
    statusMessage === 'Password has successfully changed' ||
    statusMessage === 'User sign-in success' ||
    statusMessage === 'Your saved password has been successfully retrieved' ||
    statusMessage === 'Sign-out success';

  const homeToastError =
    (authError && typeof authError === 'string') || (errorAPI && typeof errorAPI === 'number');

  const homeToastInfo = (!isHomeLoader && additionalRequests) || filteredNews?.length > 0;

  const favouritesToastInfo = isFavoriteActive && !commonDBLoader && allFavourites?.length > 0;
  const readsToastInfo = isReadActive && !commonDBLoader && allReads?.length > 0;
  const archiveToast = isArchiveActive && dbSuccessMessage === 'Remove news success';

  // console.log('archiveToast', archiveToast);

  const showHomeToast = isHomeActive && (homeToastError || homeToastSuccess || homeToastInfo);

  const shouldShowToast = showHomeToast || favouritesToastInfo || readsToastInfo || archiveToast;

  //Виведення статусу та типу тостів
  let statusToast: ToastStatus;
  let toastType: ToastVariant;

  switch (true) {
    case isHomeActive && homeToastSuccess:
      statusToast = 'success';
      toastType = 'non-interactive';
      break;
    case isHomeActive && homeToastError:
      statusToast = 'error';
      toastType = 'interactive';
      break;
    case isHomeActive && homeToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case favouritesToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case readsToastInfo:
      statusToast = 'info';
      toastType = 'non-interactive';
      break;
    case archiveToast:
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
