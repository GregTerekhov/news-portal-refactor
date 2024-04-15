import { useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

const useShowLoader = () => {
  const { hasResults } = useFiltersRedux(); // Статус фільтрів (результати є чи ні)
  const { isLoadingAPIData } = useNewsAPIRedux(); // Завантаження даних з зовнішнього API
  const { isLoadingDBData } = useDBRedux(); // Завантаження даних з бази даних
  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = useActiveLinks(); // Активні сторінки

  // Перевірка, чи триває загальне завантаження з бази даних
  const commonDBLoader = isLoadingDBData || hasResults === 'loading';

  // Перевірка, чи триває завантаження на домашній сторінці
  const isHomeLoader = isLoadingAPIData || commonDBLoader;
  // Перевірка, чи потрібно показувати завантажувач для домашньої сторінки
  const showHomeLoader = isHomeActive && isHomeLoader;
  // Перевірка, чи потрібно показувати завантажувач для вибраних або прочитаних новин
  const showFavouritesAndReadsLoader = (isFavoriteActive || isReadActive) && commonDBLoader;
  // Перевірка, чи потрібно показувати завантажувач для архіву
  const showArchiveLoader = isArchiveActive && isLoadingDBData;

  // Перевірка, чи потрібно взагалі показувати будь-який завантажувач
  const shouldShowLoader = showHomeLoader || showFavouritesAndReadsLoader || showArchiveLoader;

  return { commonDBLoader, isHomeLoader, shouldShowLoader };
};

export default useShowLoader;
