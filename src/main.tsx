import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'flowbite';

import store, { persistor } from 'reduxStore/store';

import { WindowWidthProvider } from './contexts';

import App from './App';
import { Loader } from 'components';

import './input.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <WindowWidthProvider>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<Loader variant='page' />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </WindowWidthProvider>
  </Provider>,
  // </React.StrictMode>,
);
