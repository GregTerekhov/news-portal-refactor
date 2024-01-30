import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
  AboutUs,
  AccountManagePage,
  AccountPage,
  ArchivePage,
  ErrorPage,
  FavouritePage,
  HomePage,
  ReadPage,
} from 'pages';
import { ProtectedRoute } from 'routes';
import { AccountLayout, Layout } from 'layouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        errorElement: <ErrorPage />,
        element: <ProtectedRoute />,
        children: [
          {
            path: 'favourite', // замінити всюди шляхи з косою рискою на відносні шляхи - без неї
            element: <FavouritePage />,
          },
          {
            path: 'read',
            element: <ReadPage />,
          },
          {
            path: 'archive',
            element: <ArchivePage />,
          },
          {
            path: 'account',
            element: <AccountLayout />,
            children: [
              {
                index: true,
                element: <AccountPage />,
              },
              {
                path: 'account-manage',
                element: <AccountManagePage />,
              },
            ],
          },
        ],
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
