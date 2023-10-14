import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { PageScrollController, SearchBlock } from 'components';
import { WindowWidthProvider } from 'contexts';

const Layout = () => {
  return (
    <WindowWidthProvider>
      <Header />
      <section className='w-full bg-whiteBase h-screen pt-2.5 md:pt-7 pb-[60px] md:pb-[100px] lg:pb-[150px]'>
        <div className='container mx-auto px-4'>
          <SearchBlock />
          <PageScrollController />

          <Outlet />
        </div>
      </section>
    </WindowWidthProvider>
  );
};

export default Layout;
