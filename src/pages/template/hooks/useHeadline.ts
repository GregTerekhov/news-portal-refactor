import { useNewsAPIRedux } from 'reduxStore/hooks';
import { useActiveLinks } from 'hooks';

const useHeadline = () => {
  const { headline } = useNewsAPIRedux();
  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = useActiveLinks();

  const getHeadline = (): string => {
    switch (true) {
      case headline && isHomeActive:
        return headline;
      case isFavoriteActive:
        return 'Favourite news';
      case isReadActive:
        return 'Read news';
      case isArchiveActive:
        return 'Archive news';

      default:
        return '';
    }
  };

  return { getHeadline };
};

export default useHeadline;
