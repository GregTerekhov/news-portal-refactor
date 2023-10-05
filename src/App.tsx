import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, ErrorPage, FavouritePage, ReadPage } from './pages';

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favourite' element={<FavouritePage />} />
        <Route path='/read' element={<ReadPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
