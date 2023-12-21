import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

export type ProtectedRouteProps = {
  children?: ReactElement;
} & { redirectPath?: string };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, redirectPath = '/' }) => {
  const { isAuthenticated, isRefreshingUser } = useAuthRedux();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const location = useLocation();

  //перевірка асинхронної isRefreshingUser, щоб була можливість повертатись на попередню сторінку з ErrorPage та оновлювати поточну сторінку без redirect на HomePage
  useEffect(() => {
    if (!isAuthChecked && !isRefreshingUser) {
      setIsAuthChecked(true);
    }
  }, [isAuthChecked, isRefreshingUser]);

  if (!isAuthenticated && isAuthChecked) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
