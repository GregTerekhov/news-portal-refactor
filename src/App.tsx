import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'routes';
import { AccountLayout, Layout } from 'layouts';

import { useAuthRedux } from 'reduxStore/hooks';

import { Loader } from 'ui';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const FavouritePage = lazy(() => import('./pages/FavouritePage/FavouritePage'));
const ReadPage = lazy(() => import('./pages/ReadPage/ReadPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage/ArchivePage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const AccountManagePage = lazy(() => import('./pages/AccountManagePage/AccountManagePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <ErrorPage />,

//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: '',
//         element: <ProtectedRoute />,
//         children: [
//           {
//             path: 'favourite', // замінити всюди шляхи з косою рискою на відносні шляхи - без неї
//             element: <FavouritePage />,
//           },
//           {
//             path: 'read',
//             element: <ReadPage />,
//           },
//           {
//             path: 'archive',
//             element: <ArchivePage />,
//           },
//           {
//             path: 'account',
//             element: <AccountLayout />,
//             children: [
//               {
//                 index: true,
//                 element: <AccountPage />,
//               },
//               {
//                 path: 'account-manage',
//                 element: <AccountManagePage />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: 'about-us',
//         element: <AboutUs />,
//       },
//     ],
//   },
// ]);

function App() {
  const { isRefreshingUser, fetchCurrentAuthUser } = useAuthRedux();

  useEffect(() => {
    fetchCurrentAuthUser();
  }, [fetchCurrentAuthUser]);

  return isRefreshingUser ? (
    <Loader variant='page' />
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/favourite' element={<FavouritePage />} />
          <Route path='/read' element={<ReadPage />} />
          <Route path='/archive' element={<ArchivePage />} />
          <Route element={<AccountLayout />}>
            <Route path='/account' element={<AccountPage />} />
            <Route path='/account-manage' element={<AccountManagePage />} />
          </Route>
        </Route>
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
