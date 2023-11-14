import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector, useNewsAPICollector, useWindowWidth } from 'hooks';

import { Hero, NewsFilterManager, PageScrollController } from 'components';

import Header from './Header';

const Layout = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { fetchCategoriesList } = useNewsAPICollector();
  const { isLoggedIn } = useAuthCollector();

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const shouldShowPageScrollController =
    (activeLinks.isHomeActive && breakpointsForMarkup?.isTablet) ||
    (activeLinks.isHomeActive && breakpointsForMarkup?.isDesktop) ||
    (activeLinks.isArchiveActive && breakpointsForMarkup?.isTablet) ||
    (activeLinks.isArchiveActive && breakpointsForMarkup?.isDesktop);

  return (
    <>
      <Header />
      <main>
        {activeLinks.isHomeActive && <Hero />}
        <section
          className={`w-full bg-whiteBase dark:bg-darkBackground transition-colors duration-500 h-full ${
            !activeLinks.isHomeActive ? 'pt-10 md:pt-12 lg:pt-[60px]' : 'pt-6 md:pt-7'
          } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {isLoggedIn && (
              <div className='mb-10 md:mb-12 lg:mb-[60px]'>
                <NewsFilterManager />
              </div>
            )}
            {shouldShowPageScrollController ? (
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
      </main>
    </>
  );
};

export default Layout;
