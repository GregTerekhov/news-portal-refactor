import React, { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector, useNewsAPICollector, useWindowWidth } from 'hooks';

import { Hero, NewsFilterManager, PageScrollController, ThemeSwitcher } from 'components';

import Header from './Header';

const Layout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { fetchCategoriesList } = useNewsAPICollector();
  const { isAuthenticated } = useAuthCollector();
  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  useEffect(() => {
    // fetchCurrentAuthUser()
    fetchCategoriesList();
  }, [fetchCategoriesList]);

  const shouldShowPageScrollController =
    (activeLinks.isHomeActive && breakpointsForMarkup?.isTablet) ||
    (activeLinks.isHomeActive && breakpointsForMarkup?.isDesktop) ||
    (activeLinks.isArchiveActive && breakpointsForMarkup?.isTablet) ||
    (activeLinks.isArchiveActive && breakpointsForMarkup?.isDesktop);

  const isAccountPages = activeLinks.isAccountPage || activeLinks.isManageAccountPage;

  return (
    <>
      <Header />
      <main>
        {activeLinks.isHomeActive && <Hero />}
        <section
          className={`w-full bg-whiteBase dark:bg-darkBackground transition-colors duration-500 h-full ${
            activeLinks.isArchiveActive || activeLinks.isFavoriteActive || activeLinks.isReadActive
              ? 'pt-10 md:pt-12 lg:pt-[60px]'
              : 'pt-6 md:pt-7'
          } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {isAuthenticated && !isAccountPages ? (
              <div className='mb-10 md:mb-12 lg:mb-[60px]'>
                <NewsFilterManager />
              </div>
            ) : null}
            {(!isAuthenticated && breakpointsForMarkup?.isNothing) ||
            breakpointsForMarkup?.isMobile ? (
              <div
                className={`flex items-start ${
                  !isAccountPages ? 'justify-end mb-10' : 'justify-between mb-2'
                }`}
              >
                {!isAccountPages ? <ThemeSwitcher /> : null}
              </div>
            ) : null}
            {shouldShowPageScrollController ? (
              <>
                <PageScrollController
                  direction='top'
                  dataTooltipTarget='tooltip-scroll-up'
                  position='top-36'
                  icon='icon-triangle-up'
                />
                <PageScrollController
                  dataTooltipTarget='tooltip-scroll-down'
                  direction='down'
                  position='bottom-12'
                  icon='icon-triangle-down'
                />
              </>
            ) : null}
            {/* {isRefreshingUser ?
              <Loader variant='page' /> : */}
            <Outlet />
            {/* } */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Layout;
