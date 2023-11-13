import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, ErrorPage, FavouritePage, ReadPage } from './pages';
import { Layout } from './layouts';
import { WindowWidthProvider } from 'contexts';
import { useAppDispatch } from 'redux/hooks';
import { fetchCurrentUser } from 'redux/auth';

function App() {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(fetchCurrentUser());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <WindowWidthProvider>
      <Suspense>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/favourite' element={<FavouritePage />} />
            <Route path='/read' element={<ReadPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </WindowWidthProvider>
  );
}

export default App;
