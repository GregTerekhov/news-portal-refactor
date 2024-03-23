import { useMemo } from 'react';
import { Location, useLocation } from 'react-router-dom';

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
  ];

  const activeLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === '/',
      isFavoriteActive: location.pathname === '/favourite',
      isReadActive: location.pathname === '/read',
      isArchiveActive: location.pathname === '/archive',
      isAccountPage: location.pathname === '/account',
      isManageAccountPage: location.pathname === '/account-manage',
      isAboutUs: location.pathname === '/about-us',
      isServerErrorPage: location.pathname === '/server-error',
      isErrorPage: !validPaths.includes(location.pathname),
    }),
    [location.pathname],
  );
  return activeLinks;
};

export default useActiveLinks;
