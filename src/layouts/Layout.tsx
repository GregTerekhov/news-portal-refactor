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

import Header from './Header/Header';
import Footer from './Footer/Footer';

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
    if (isAuthenticated && activeLinks.isHomeActive) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList, activeLinks]);

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const shouldShowPageScrollController =
    (activeLinks?.isHomeActive && isNotMobile && rebuildedNews?.length > 0) ||
    (activeLinks?.isArchiveActive && isNotMobile && rebuildedNews?.length > 0);

  const isAccountPages = activeLinks.isAccountPage || activeLinks.isManageAccountPage;
  const shouldNotShowFiltersManager =
    isAccountPages ||
    activeLinks?.isAboutUs ||
    activeLinks?.isArchiveActive ||
    activeLinks?.isErrorPage;

  return (
    <div
      className={`max-h-sectionSmall md:max-h-sectionMedium lg:max-h-sectionLarge ${
        activeLinks?.isHomeActive ? 'h-full' : 'h-screen'
      } w-full flex flex-col justify-between`}
    >
      {!activeLinks?.isErrorPage && <Header />}
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
            {isAuthenticated && !shouldNotShowFiltersManager ? <NewsFilterManager /> : null}
            {!isAuthenticated && !isNotMobile && !activeLinks?.isErrorPage && (
              <div className='flex justify-end mb-10'>
                <ThemeSwitcher />
              </div>
            )}
            {activeLinks?.isErrorPage && (
              <div className='flex justify-end mb-10'>
                <ThemeSwitcher />
              </div>
            )}
            {shouldShowPageScrollController ? (
              <>
                <PageScrollController
                  direction='top'
                  label='Scroll up'
                  position='top-36'
                  icon='icon-triangle-up'
                />
                <PageScrollController
                  label='Scroll down'
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
      {!activeLinks?.isErrorPage && <Footer />}
    </div>
  );
};

export default Layout;
