import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'routes';

import { useAuthCollector } from './hooks';

import { AccountLayout, Layout } from './layouts';
import { Loader } from './components';
// import { Loader } from './components';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const FavouritePage = lazy(() => import('./pages/FavouritePage/FavouritePage'));
const ReadPage = lazy(() => import('./pages/ReadPage/ReadPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage/ArchivePage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const AccountManagePage = lazy(() => import('./pages/AccountManagePage/AccountManagePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));

function App() {
  // const { isAuthenticated, isRefreshingUser, fetchCurrentAuthUser } = useAuthCollector();
  const { isRefreshingUser } = useAuthCollector();

  // useEffect(() => {
  //   // if (user && user.id) {
  //   fetchCurrentAuthUser();
  //   // }
  // }, [isAuthenticated, fetchCurrentAuthUser]);

  return isRefreshingUser ? (
    <Loader variant='page' />
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/favourite' element={<FavouritePage />} />
          <Route path='/read' element={<ReadPage />} />
          <Route path='/archive' element={<ArchivePage />} />
          <Route element={<AccountLayout />}>
            <Route path='/account' element={<AccountPage />} />
            <Route path='/account-manage' element={<AccountManagePage />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
