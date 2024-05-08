import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'routes';
import { useAuthRedux } from 'reduxStore/hooks';

import { Paths } from './hooks';
import { AccountLayout, Layout } from 'layouts';

import { Loader } from 'ui';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const FavouritePage = lazy(() => import('./pages/FavouritePage/FavouritePage'));
const ReadPage = lazy(() => import('./pages/ReadPage/ReadPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage/ArchivePage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const AccountManagePage = lazy(() => import('./pages/AccountManagePage/AccountManagePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs'));
const ServerErrorPage = lazy(() => import('./pages/ServerErrorPage/ServerErrorPage'));
const DevelopmentPage = lazy(() => import('./pages/DevelopmentPage/DevelopmentPage'));

function App() {
  const { isRefreshingUser, fetchCurrentAuthUser } = useAuthRedux();

  useEffect(() => {
    fetchCurrentAuthUser();
  }, []);

  return isRefreshingUser ? (
    <Loader variant='page' />
  ) : (
    <Routes>
      <Route path={Paths.Home} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.Favourite} element={<FavouritePage />} />
          <Route path={Paths.Read} element={<ReadPage />} />
          <Route path={Paths.Archive} element={<ArchivePage />} />
          <Route element={<AccountLayout />}>
            <Route path={Paths.Account} element={<AccountPage />} />
            <Route path={Paths.AccountSettings} element={<AccountManagePage />} />
          </Route>
        </Route>
        <Route path={Paths.About} element={<AboutUs />} />
        <Route path={Paths.ServerError} element={<ServerErrorPage />} />
        <Route path={Paths.InDevelopment} element={<DevelopmentPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
