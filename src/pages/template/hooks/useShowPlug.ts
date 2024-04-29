import { useDBRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import useShowLoader from './useShowLoader';

const useShowPlug = () => {
  const { hasResults } = useFiltersRedux(); // Стан фільтрів (результати наявні чи ні)
  const { errorAPI } = useNewsAPIRedux(); // Помилка від зовнішнього API
  const { allArchive, archiveHistoryLog, isLoadingDBData } = useDBRedux(); // Дані з бази даних та стан її завантаження

  const activeLinks = useActiveLinks(); // Активні сторінки
  const { rebuiltNews } = useChooseRenderingNews(activeLinks); // Отримання новин для відображення
  const { isHomeLoader } = useShowLoader(); // Визначення статусу завантаження для домашньої сторінки

  // Деструктуризація активних сторінок
  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  // Перевірка, чи виникла помилка 429 (забагато запитів) від зовнішнього API
  const is429ErrorAPI = errorAPI?.toString().includes('429');

  // Перевірка загальної відсутності даних для відображення
  const commonPlug = rebuiltNews?.length === 0 || hasResults === 'empty';

  // Перевірка для відображення PlugImage на домашній сторінці
  const isHomePlug = commonPlug || is429ErrorAPI!;

  // Перевірка для відображення PlugImage на сторінці архіву
  const isArchivePlug = allArchive.length === 0 && archiveHistoryLog.length === 0;

  // Перевірка, чи потрібно показувати PlugImage на домашній сторінці
  const showHomePlug = isHomeActive && isHomePlug && !isHomeLoader;

  // Перевірка, чи потрібно показувати PlugImage для вибраних або прочитаних новин
  const showFavouritesAndReadsPlug =
    (isFavoriteActive || isReadActive) && commonPlug && !isLoadingDBData;

  // Перевірка, чи потрібно показувати PlugImage на сторінці архіву
  const showArchivePlug = isArchiveActive && isArchivePlug && !isLoadingDBData;

  // Перевірка, чи потрібно взагалі показувати будь-який PlugImage
  const shouldShowPlug = showHomePlug || showFavouritesAndReadsPlug || showArchivePlug;

  return { isHomePlug, commonPlug, shouldShowPlug };
};

export default useShowPlug;
