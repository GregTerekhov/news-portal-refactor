import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
  AdditionRequestProvider,
  ModalStateProvider,
} from 'contexts';

const queryClient = new QueryClient();
const clientGoogleID = CONFIG.APP_GOOGLE_API_TOKEN;

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ModalStateProvider>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={clientGoogleID}>
            <QueryClientProvider client={queryClient}>
              <Tooltip.Provider delayDuration={500}>
                <AdditionRequestProvider>
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
                </AdditionRequestProvider>
              </Tooltip.Provider>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </ModalStateProvider>
    </PersistGate>
  </Provider>
);

export default AppProvider;
