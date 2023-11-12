import { useMemo } from 'react';
import { Location } from 'react-router-dom';

const useActiveLinks = (location: Location) => {
  const activeLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === '/',
      isFavoriteActive: location.pathname === '/favourite',
      isReadActive: location.pathname === '/read',
      isArchiveActive: location.pathname === '/archive',
    }),
    [location.pathname],
  );
  return activeLinks;
};

export default useActiveLinks;
