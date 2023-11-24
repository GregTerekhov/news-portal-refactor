import React, { FC, ReactElement } from 'react';

import { useAuthCollector } from 'hooks';
import { Navigate, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = {
  Component?: ReactElement;
} & { redirectPath?: string };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ Component, redirectPath = '/' }) => {
  const { isAuthenticated } = useAuthCollector();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return Component;
};

export default ProtectedRoute;
