import { useMemo } from 'react';
import { Location, useLocation } from 'react-router-dom';

import { Paths, type ActiveLinks } from './commonTypes';

const useActiveLinks = () => {
  const location: Location = useLocation();

  const validPaths: string[] = Object.values(Paths);

  const activeLinks: ActiveLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === Paths.Home,
      isFavoriteActive: location.pathname === Paths.Favourite,
      isReadActive: location.pathname === Paths.Read,
      isArchiveActive: location.pathname === Paths.Archive,
      isAccountPage: location.pathname === Paths.Account,
      isManageAccountPage: location.pathname === Paths.AccountSettings,
      isAboutUs: location.pathname === Paths.About,
      isServerErrorPage: location.pathname === Paths.ServerError,
      isDevelopmentActive: location.pathname === Paths.InDevelopment,
      isErrorPage: !validPaths.includes(location.pathname),
    }),
    [location.pathname],
  );
  return activeLinks;
};

export default useActiveLinks;
