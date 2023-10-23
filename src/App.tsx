import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, ErrorPage, FavouritePage, ReadPage } from './pages';
import { Layout } from './layouts';
import { WindowWidthProvider } from 'contexts';

function App() {
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
