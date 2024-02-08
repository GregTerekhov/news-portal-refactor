import { ToastMessage } from 'types';
import { ActiveLinks, useChooseRenderingNews } from 'hooks';

const useToastInfo = () => {
  const chooseInfoToastText = (activeLinks: ActiveLinks): ToastMessage => {
    const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

    const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

    let title = '';
    let description = '';

    switch (true) {
      case isHomeActive:
        title = 'Found news';
        description = `There are ${rebuildedNews.length} news has been found`;
        break;
      case isFavoriteActive:
        title = 'Monthly statistics';
        description = `${rebuildedNews.length} news added to Favourites`;
        break;
      case isReadActive:
        title = 'Monthly statistics';
        description = `${rebuildedNews.length} news added to Reads`;
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
