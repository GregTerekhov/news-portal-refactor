import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from 'AppProvider';

import { WindowWidthProvider } from 'contexts';

import App from './App';
import { Loader } from 'ui';

import './input.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <WindowWidthProvider>
      <Suspense fallback={<Loader variant='page' />}>
        <AppProvider>
          <App />
        </AppProvider>
      </Suspense>
    </WindowWidthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
