import { useMemo } from 'react';
import { Location, useLocation } from 'react-router-dom';

import type { ActiveLinks } from './commonTypes';

const useActiveLinks = () => {
  const location: Location = useLocation();

  const validPaths = [
    '/',
    '/favourite',
    '/read',
    '/archive',
    '/account',
    '/account-manage',
    '/about-us',
    '/server-error',
    '/development',
  ];

  const activeLinks: ActiveLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === '/',
      isFavoriteActive: location.pathname === '/favourite',
      isReadActive: location.pathname === '/read',
      isArchiveActive: location.pathname === '/archive',
      isAccountPage: location.pathname === '/account',
      isManageAccountPage: location.pathname === '/account-manage',
      isAboutUs: location.pathname === '/about-us',
      isServerErrorPage: location.pathname === '/server-error',
      isDevelopmentActive: location.pathname === '/development',
      isErrorPage: !validPaths.includes(location.pathname),
    }),
    [location.pathname],
  );
  return activeLinks;
};

export default useActiveLinks;
