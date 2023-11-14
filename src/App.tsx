import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WindowWidthProvider } from 'contexts';
import { useAuthCollector } from './hooks';

import { HomePage, ErrorPage, FavouritePage, ReadPage, ArchivePage } from './pages';
import { Layout } from './layouts';

function App() {
  const { fetchCurrentAuthUser } = useAuthCollector();

  useEffect(() => {
    fetchCurrentAuthUser();
  }, []);

  return (
    <WindowWidthProvider>
      <Suspense>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
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
