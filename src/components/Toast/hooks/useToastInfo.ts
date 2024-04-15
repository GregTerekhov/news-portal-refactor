import type { ToastInfoTitle, ToastMessage } from 'types';

import { ActiveLinks, useChooseRenderingNews } from 'hooks';

const useToastInfo = () => {
  //Функція виведення заголовка та опису для інформаційних тостів
  const chooseInfoToastText = (activeLinks: ActiveLinks): ToastMessage => {
    const { rebuiltNews } = useChooseRenderingNews(activeLinks);

    const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

    let title: ToastInfoTitle;
    let description = '';

    switch (true) {
      case isHomeActive:
        title = 'Found news';
        description = `There are ${rebuiltNews?.length ?? 'no'} news has been found`;
        break;
      case isFavoriteActive:
        title = 'Monthly statistics';
        description = `${rebuiltNews?.length} news added to Favourites`;
        break;
      case isReadActive:
        title = 'Monthly statistics';
        description = `${rebuiltNews?.length} news added to Reads`;
        break;
      default:
        title = '';
        description = '';
        break;
    }

    return { title, description };
  };

  return { chooseInfoToastText };
};

export default useToastInfo;
