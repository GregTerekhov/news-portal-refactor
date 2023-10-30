import React from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { FiltersBlock, Hero, PageScrollController, SearchBlock } from 'components';
import { useWindowWidth } from 'hooks';

const Layout = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />
      {isHomePage && <Hero />}
      <section className='w-full bg-whiteBase dark:bg-darkThemeBackground h-full pt-2.5 md:pt-7 pb-[60px] md:pb-[100px] lg:pb-[150px]'>
        <div className='container mx-auto px-4 hg:px-[65px]'>
          <div className='flex gap-7 mb-10 md:mb-12 lg:mb-[60px]'>
            {isHomePage && <SearchBlock />}
            <FiltersBlock />
          </div>
          {(isHomePage && breakpointsForMarkup?.isTablet) || breakpointsForMarkup?.isDesktop ? (
            <>
              <PageScrollController direction='top' position='top-36' icon='icon-triangle-up' />
              <PageScrollController
                direction='down'
                position='bottom-12'
                icon='icon-triangle-down'
              />
            </>
          ) : null}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Layout;
