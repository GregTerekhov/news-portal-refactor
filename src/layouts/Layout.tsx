import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector, useNewsAPICollector, useWindowWidth } from 'hooks';

import { Hero, NewsFilterManager, PageScrollController, ThemeSwitcher } from 'components';

import { SvgIcon } from 'ui';
import Header from './Header';

const Layout = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { fetchCategoriesList } = useNewsAPICollector();
  const { isLoggedIn } = useAuthCollector();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  useEffect(() => {
    fetchCategoriesList();
  }, [fetchCategoriesList]);

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
            activeLinks.isArchiveActive || activeLinks.isFavoriteActive || activeLinks.isReadActive
              ? 'pt-10 md:pt-12 lg:pt-[60px]'
              : 'pt-6 md:pt-7'
          } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {isLoggedIn ? (
              <div className='mb-10 md:mb-12 lg:mb-[60px]'>
                <NewsFilterManager />
              </div>
            ) : null}
            {(!isLoggedIn && breakpointsForMarkup?.isNothing) || breakpointsForMarkup?.isMobile ? (
              <div
                className={`flex items-start ${
                  !activeLinks.isAccountPage ? 'justify-end mb-10' : 'justify-between mb-2'
                }`}
              >
                {activeLinks.isAccountPage ? (
                  <SvgIcon
                    svgName='icon-logo'
                    size={80}
                    className='fill-darkBase dark:fill-whiteBase'
                  />
                ) : null}
                {!activeLinks.isAccountPage ? (
                  <ThemeSwitcher />
                ) : (
                  <p className='text-darkBase dark:text-whiteBase text-xl leading-tighter'>
                    Your account
                  </p>
                )}
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
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default Layout;
