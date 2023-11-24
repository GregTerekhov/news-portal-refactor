import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// import { ProtectedRoute } from 'routes';

import { useAuthCollector } from './hooks';

import {
  HomePage,
  ErrorPage,
  FavouritePage,
  ReadPage,
  ArchivePage,
  AccountPage,
  AccountManagePage,
} from './pages';
import { AccountLayout, Layout } from './layouts';
import { Loader } from './components';
// import { useAppDispatch } from 'reduxStore/hooks';
// import { fetchCurrentUser } from 'reduxStore/auth';
// import { Loader } from './components';

function App() {
  const { isAuthenticated, isRefreshingUser, user, fetchCurrentAuthUser } = useAuthCollector();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('user', user);
      fetchCurrentAuthUser();
    }
  }, [isAuthenticated, fetchCurrentAuthUser]);

  return isRefreshingUser ? (
    <Loader variant='page' />
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path='/favourite' element={<FavouritePage />} />
        <Route path='/read' element={<ReadPage />} />
        <Route path='/archive' element={<ArchivePage />} />
        <Route element={<AccountLayout />}>
          <Route path='/account' element={<AccountPage />} />
          <Route path='/account-manage' element={<AccountManagePage />} />
        </Route>
        {/* </Route> */}
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
