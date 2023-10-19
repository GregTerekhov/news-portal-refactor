import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { SearchBlock } from 'components';
import { WindowWidthProvider } from 'contexts';

const Layout = () => {
  return (
    <WindowWidthProvider>
      <Header />
      <section className='w-full bg-whiteBase h-full pt-2.5 md:pt-7 pb-[60px] md:pb-[100px] lg:pb-[150px]'>
        <div className='container mx-auto px-4 hg:px-[65px]'>
          <div className='flex gap-7'>
            <SearchBlock />
            <SearchBlock />
          </div>

          <Outlet />
        </div>
      </section>
    </WindowWidthProvider>
  );
};

export default Layout;
