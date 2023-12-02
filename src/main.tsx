import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Tooltip from '@radix-ui/react-tooltip';
import 'flowbite';

import store, { persistor } from 'reduxStore/store';

import { WindowWidthProvider } from './contexts';

import App from './App';
import { Loader } from 'components';

import './input.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <WindowWidthProvider>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<Loader variant='page' />}>
            <QueryClientProvider client={queryClient}>
              <Tooltip.Provider delayDuration={500}>
                <App />
              </Tooltip.Provider>
            </QueryClientProvider>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </WindowWidthProvider>
  </Provider>,
  // </React.StrictMode>,
);
