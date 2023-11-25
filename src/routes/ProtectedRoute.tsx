import React, { FC, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthCollector } from 'hooks';

export type ProtectedRouteProps = {
  children?: ReactElement;
} & { redirectPath?: string };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, redirectPath = '/' }) => {
  const { isAuthenticated } = useAuthCollector();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
