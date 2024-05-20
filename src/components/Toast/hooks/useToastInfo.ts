import { ToastInfoTitle, type ToastMessage } from 'types';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

const useToastInfo = () => {
  //Функція виведення заголовка та опису для інформаційних тостів
  const chooseInfoToastText = (): ToastMessage => {
    const { rebuiltNews } = useChooseRenderingNews();

    const { isHomeActive, isFavoriteActive, isReadActive } = useActiveLinks();

    let title: ToastInfoTitle = ToastInfoTitle.Unknown;
    let description = '';

    switch (true) {
      case isHomeActive:
        title = ToastInfoTitle.FoundNews;
        description = `There are ${rebuiltNews?.length ?? 'no'} news has been found`;
        break;
      case isFavoriteActive:
        title = ToastInfoTitle.MonthStatistics;
        description = `${rebuiltNews?.length} news added to Favourites`;
        break;
      case isReadActive:
        title = ToastInfoTitle.MonthStatistics;
        description = `${rebuiltNews?.length} news added to Reads`;
        break;
      default:
        break;
    }

    return { title, description };
  };

  return { chooseInfoToastText };
};

export default useToastInfo;
