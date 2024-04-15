import { useEffect } from 'react';
import { useAuthRedux, useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import type { ToastStatus, ToastVariant } from 'types';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowToast = () => {
  const { filteredNews } = useFiltersRedux(); // Отримання відфільтрованих новин з Redux
  const { errorAPI, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux(); // Отримання помилок та новин за ключовим словом, категорією та датою з Redux
  const { authError, statusMessage } = useAuthRedux(); // Отримання помилки автентифікації та повідомлення статусу автентифікації з Redux
  const { allFavourites, allReads, dbSuccessMessage } = useDBRedux(); // Отримання всіх обраних та прочитаних новин, а також повідомлення успіху з бази даних з Redux
  const { setOpenToast } = useNotificationContext(); // Отримання функції відкриття тосту з контексту повідомлень

  const activeLinks = useActiveLinks(); // Отримання активних сторінок
  const { rebuiltNews } = useChooseRenderingNews(activeLinks); // Отримання перебудованих новин
  const { isHomeLoader, commonDBLoader } = useShowLoader(); // Отримання статусу завантаження для домашньої сторінки та спільного завантажувача

  // Деструктуризація активних сторінок
  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = activeLinks;

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
    'Email sent successfully',
    'Password has successfully changed',
    'User sign-in success',
    'Your saved password has been successfully retrieved',
    'Sign-out success',
  ];

  const homeToastSuccess = homeToastSuccessMessages.includes(statusMessage);
  const homeToastError =
    (authError && typeof authError === 'string') || (errorAPI && typeof errorAPI === 'number');

  const homeToastInfo = (!isHomeLoader && additionalRequests) || filteredNews?.length > 0;

  // Перевірка наявності обраних та прочитаних новин для інформаційних тостів
  const favouritesToastInfo = isFavoriteActive && !commonDBLoader && allFavourites?.length > 0;
  const readsToastInfo = isReadActive && !commonDBLoader && allReads?.length > 0;

  // Перевірка наявності тосту для архіву
  const archiveToast =
    isArchiveActive &&
    (dbSuccessMessage === 'Remove news success' ||
      dbSuccessMessage === 'Your deleted news feed has been successfully cleared') &&
    !commonDBLoader;

  // Перевірка, чи потрібно показувати тост
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
