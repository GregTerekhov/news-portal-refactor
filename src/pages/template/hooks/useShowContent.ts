import { useDBRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import useShowLoader from './useShowLoader';
import useShowPlug from './useShowPlug';

const useShowContent = () => {
  const { allArchive, isLoadingDBData } = useDBRedux(); // Отримання архіву та стану завантаження з бази даних

  // Отримання активних сторінок
  const { isArchiveActive, isFavoriteActive, isHomeActive, isReadActive } = useActiveLinks();

  const { isHomeLoader, commonDBLoader } = useShowLoader(); // Визначення статусу завантаження для домашньої сторінки
  const { isHomePlug, commonPlug } = useShowPlug(); // Визначення статусу плагіну

  // Перевірка для відображення вмісту на домашній сторінці
  const showHomeContent = isHomeActive && !isHomeLoader && !isHomePlug;

  // Перевірка для відображення вмісту для вибраних або прочитаних новин
  const showVotedContent = (isFavoriteActive || isReadActive) && !commonDBLoader && !commonPlug;

  // Перевірка для відображення вмісту на сторінці архіву
  const showArchiveContent = isArchiveActive && !isLoadingDBData && allArchive?.length > 0;

  // Перевірка, чи потрібно взагалі показувати вміст
  const shouldShowContent = showHomeContent || showVotedContent || showArchiveContent;

  return { shouldShowContent };
};

export default useShowContent;
