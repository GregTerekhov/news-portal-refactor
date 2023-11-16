import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WindowWidthProvider } from 'contexts';
import { useAuthCollector } from './hooks';

import { HomePage, ErrorPage, FavouritePage, ReadPage, ArchivePage, AccountPage } from './pages';
import { Layout } from './layouts';

function App() {
  // const location = useLocation();
  // const activeLinks = useActiveLinks(location);
  const { fetchCurrentAuthUser } = useAuthCollector();
  const persistedToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    console.log('useEffect');
    if (persistedToken) {
      fetchCurrentAuthUser();
    }
  }, [fetchCurrentAuthUser]);

  return (
    <WindowWidthProvider>
      <Suspense>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/favourite' element={<FavouritePage />} />
            <Route path='/read' element={<ReadPage />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </WindowWidthProvider>
  );
}

export default App;
