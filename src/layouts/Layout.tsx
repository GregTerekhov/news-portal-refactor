import React, { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useNewsAPICollector,
  useWindowWidth,
} from 'hooks';

import { Hero, NewsFilterManager, PageScrollController, ThemeSwitcher } from 'components';

import Header from './Header';
import Footer from './Footer';

const Layout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { fetchCategoriesList } = useNewsAPICollector();
  const { isAuthenticated } = useAuthCollector();
  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList]);

  const shouldShowPageScrollController =
    (activeLinks?.isHomeActive && breakpointsForMarkup?.isTablet && rebuildedNews?.length > 0) ||
    (activeLinks?.isHomeActive && breakpointsForMarkup?.isDesktop && rebuildedNews?.length > 0) ||
    (activeLinks?.isArchiveActive && breakpointsForMarkup?.isTablet && rebuildedNews?.length > 0) ||
    (activeLinks?.isArchiveActive && breakpointsForMarkup?.isDesktop && rebuildedNews?.length > 0);

  const isAccountPages = activeLinks.isAccountPage || activeLinks.isManageAccountPage;
  const shouldShowFiltersManager = isAccountPages || activeLinks?.isAboutUs;

  return (
    <div className='max-h-sectionSmall md:max-h-sectionMedium lg:max-h-sectionLarge h-full w-full flex flex-col justify-between'>
      <Header />
      <main>
        {activeLinks.isHomeActive && <Hero />}
        <section
          className={`w-screen bg-whiteBase dark:bg-darkBackground transition-colors duration-500 h-full ${
            activeLinks.isArchiveActive || activeLinks.isFavoriteActive || activeLinks.isReadActive
              ? 'pt-10 md:pt-12 lg:pt-[60px]'
              : 'pt-6 md:pt-7'
          } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {isAuthenticated && !shouldShowFiltersManager ? <NewsFilterManager /> : null}
            {(!isAuthenticated && breakpointsForMarkup?.isNothing) ||
            breakpointsForMarkup?.isMobile ? (
              <div className='flex justify-end mb-10'>
                <ThemeSwitcher />
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
      <Footer />
    </div>
  );
};

export default Layout;
