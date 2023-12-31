import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Toast from '@radix-ui/react-toast';

import store, { persistor } from 'reduxStore/store';

import { CONFIG } from 'config';

import {
  FiltersProvider,
  NotificationProvider,
  SelectedDateProvider,
  WindowWidthProvider,
  ReadSortProvider,
} from 'contexts';

import App from './App';
import { Loader } from 'ui';

import './input.css';

const queryClient = new QueryClient();
const clientGoogleID: string = CONFIG.APP_GOOGLE_API_TOKEN;
const facebookID: string = CONFIG.APP_FACEBOOK_APP_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <WindowWidthProvider>
          <Suspense fallback={<Loader variant='page' />}>
            <GoogleOAuthProvider clientId={clientGoogleID}>
              <FacebookProvider appId={facebookID}>
                <QueryClientProvider client={queryClient}>
                  <Tooltip.Provider delayDuration={500}>
                    <Toast.Provider>
                      <NotificationProvider>
                        <SelectedDateProvider>
                          <FiltersProvider>
                            <ReadSortProvider>
                              <App />
                            </ReadSortProvider>
                          </FiltersProvider>
                        </SelectedDateProvider>
                      </NotificationProvider>
                    </Toast.Provider>
                  </Tooltip.Provider>
                </QueryClientProvider>
              </FacebookProvider>
            </GoogleOAuthProvider>
          </Suspense>
        </WindowWidthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
