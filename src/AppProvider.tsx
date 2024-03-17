import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Toast from '@radix-ui/react-toast';

import { store, persistor } from 'reduxStore/store';
import { CONFIG } from 'config';

import {
  ThemeProvider,
  FiltersProvider,
  NotificationProvider,
  SelectedDateProvider,
  ReadSortProvider,
  ScrollBodyProvider,
  PaginationProvider,
} from 'contexts';

const queryClient = new QueryClient();
const clientGoogleID = CONFIG.APP_GOOGLE_API_TOKEN;
const facebookID = CONFIG.APP_FACEBOOK_APP_ID;

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={clientGoogleID}>
          <FacebookProvider appId={facebookID}>
            <QueryClientProvider client={queryClient}>
              <Tooltip.Provider delayDuration={500}>
                <Toast.Provider>
                  <NotificationProvider>
                    <PaginationProvider>
                      <ScrollBodyProvider>
                        <SelectedDateProvider>
                          <FiltersProvider>
                            <ReadSortProvider>{children}</ReadSortProvider>
                          </FiltersProvider>
                        </SelectedDateProvider>
                      </ScrollBodyProvider>
                    </PaginationProvider>
                  </NotificationProvider>
                </Toast.Provider>
              </Tooltip.Provider>
            </QueryClientProvider>
          </FacebookProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProvider;
