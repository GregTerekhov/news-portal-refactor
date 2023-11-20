import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'routes';

// import { useAuthCollector } from './hooks';

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
// import { Loader } from './components';

function App() {
  // const { isRefreshingUser } = useAuthCollector();
  // const { errorDB } = useNewsDBCollector();
  // const auth = localStorage.getItem('persist:auth');
  // if (auth) {
  //   const objectPersist = JSON.parse(auth);
  //   // console.log('objectPersist', objectPersist);
  //   // const persistedToken = Object.values(objectPersist);
  //   // console.log('persistedToken', persistedToken);
  // }
  // const persistedToken = Object.keys(auth);
  // console.log(typeof persistedToken);
  // console.log('auth', auth, typeof auth);

  // useEffect(() => {
  //   // if (persistedToken) {
  //   // console.log('useEffect/fetchCurrentAuthUser');
  //   fetchCurrentAuthUser();
  //   // }
  //   // if (errorDB) {
  //   //   console.log('useEffect, errorDB');
  //   //   if (
  //   //     errorDB.message === 'Access token did not pass verification' ||
  //   //     errorDB.message === 'jwt expired'
  //   //   ) {
  //   //     fetchCurrentAuthUser();
  //   //   }
  //   // }
  //   // }, [fetchCurrentAuthUser, errorDB]);
  // }, []);


  return (
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
