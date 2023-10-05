import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { PageScrollController, SearchBlock } from '../components';

const Layout = () => {
  return (
    <div>
      <Header />
      <PageScrollController />
      <SearchBlock />
      <Outlet />
    </div>
  );
};

export default Layout;
