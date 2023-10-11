import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { PageScrollController, SearchBlock } from 'components';
import { WindowWidthProvider } from 'contexts';

const Layout = () => {
  return (
    <WindowWidthProvider>
      <Header />
      <section className='w-full bg-whiteBase h-screen'>
        <div className='container mx-auto px-4'>
          <PageScrollController />
          <SearchBlock />
          <Outlet />
        </div>
      </section>
    </WindowWidthProvider>
  );
};

export default Layout;
