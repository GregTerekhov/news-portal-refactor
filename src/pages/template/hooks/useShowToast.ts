import { useEffect } from 'react';

import { SuccessCaseWithoutAccount, ToastStatus, ToastVariant } from 'types';

import { useAuthRedux, useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowToast = () => {
  const { filteredNews } = useFiltersRedux(); // Отримання відфільтрованих новин з Redux
  const { errorAPI, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux(); // Отримання помилок та новин за ключовим словом, категорією та датою з Redux
  const { authError, statusMessage } = useAuthRedux(); // Отримання помилки автентифікації та повідомлення статусу автентифікації з Redux
  const { allFavourites, allReads, dbSuccessMessage } = useDBRedux(); // Отримання всіх обраних та прочитаних новин, а також повідомлення успіху з бази даних з Redux
  const { setOpenToast } = useNotificationContext(); // Отримання функції відкриття тосту з контексту повідомлень

  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = useActiveLinks(); // Отримання активних сторінок
  const { rebuiltNews } = useChooseRenderingNews(); // Отримання перебудованих новин
  const { isHomeLoader, commonDBLoader } = useShowLoader(); // Отримання статусу завантаження для домашньої сторінки та спільного завантажувача

  useEffect(() => {
    if ((isFavoriteActive || isReadActive) && rebuiltNews?.length > 0) setOpenToast(true);
  }, []);

  // Перевірка наявності результатів додаткових запитів для відображення інформаційних тостів
  const additionalRequests =
    (newsByKeyword && newsByKeyword.length > 0) ||
    (newsByCategory && newsByCategory.length > 0) ||
    (newsByDate && newsByDate.length > 0);

  // Перевірка для визначення типу і статусу тостів для домашньої сторінки
  const homeToastSuccessMessages = [
    SuccessCaseWithoutAccount.RecoveryPasswordSent,
    SuccessCaseWithoutAccount.PasswordChange,
    SuccessCaseWithoutAccount.SignIn,
    SuccessCaseWithoutAccount.SignUp,
    SuccessCaseWithoutAccount.RememberMe,
    SuccessCaseWithoutAccount.SignOut,
  ];

  const homeToastSuccess = homeToastSuccessMessages.includes(
    statusMessage as SuccessCaseWithoutAccount,
  );
  const homeToastError = typeof authError === 'string' || typeof errorAPI === 'number';

  const homeToastInfo = (!isHomeLoader && additionalRequests) || filteredNews?.length > 0;

  // Перевірка наявності обраних та прочитаних новин для інформаційних тостів
  const favouritesToastInfo = isFavoriteActive && !commonDBLoader && allFavourites?.length > 0;
  const readsToastInfo = isReadActive && !commonDBLoader && allReads?.length > 0;

  // Перевірка наявності тосту для архіву
  const archiveToast =
    isArchiveActive &&
    (dbSuccessMessage === SuccessCaseWithoutAccount.DeleteNews ||
      dbSuccessMessage === SuccessCaseWithoutAccount.ClearLog) &&
    !commonDBLoader;

  // Перевірка, чи потрібно показувати тост
  const showHomeToast = isHomeActive && (homeToastError || homeToastSuccess || homeToastInfo);
  const shouldShowToast = showHomeToast || favouritesToastInfo || readsToastInfo || archiveToast;

  //Виведення статусу та типу тостів
  let statusToast: ToastStatus;
  let toastType: ToastVariant;

  switch (true) {
    case isHomeActive && homeToastSuccess:
      statusToast = ToastStatus.Success;
      toastType = ToastVariant.Background;
      break;
    case isHomeActive && homeToastError:
      statusToast = ToastStatus.Error;
      toastType = ToastVariant.Foreground;
      break;
    case isHomeActive && homeToastInfo:
      statusToast = ToastStatus.Info;
      toastType = ToastVariant.Background;
      break;
    case favouritesToastInfo:
      statusToast = ToastStatus.Info;
      toastType = ToastVariant.Background;
      break;
    case readsToastInfo:
      statusToast = ToastStatus.Info;
      toastType = ToastVariant.Background;
      break;
    case archiveToast:
      statusToast = ToastStatus.Success;
      toastType = ToastVariant.Foreground;
      break;

    default:
      statusToast = ToastStatus.Info;
      toastType = ToastVariant.Background;
      break;
  }

  return { shouldShowToast, statusToast, toastType };
};

export default useShowToast;
