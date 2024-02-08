import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';

import { VariantSwitcher } from 'types';
import { useWindowWidth } from 'contexts';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsFilterManager, PageScrollController, Toast } from 'components';
import { ThemeSwitcher } from 'ui';

import { Hero } from './subcomponents';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { fetchCategoriesList } = useNewsAPI();
  const { isAuthenticated, statusMessage } = useAuthRedux();
  const { allFavourites, allReads, allArchive } = useDB();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const {
    isAboutUs,
    isAccountPage,
    isArchiveActive,
    isErrorPage,
    isFavoriteActive,
    isHomeActive,
    isManageAccountPage,
    isReadActive,
  } = activeLinks;

  useEffect(() => {
    if (isAuthenticated && isHomeActive) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList, isHomeActive]);

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const shouldShowPageScrollController =
    (isHomeActive && isNotMobile && rebuildedNews?.length > 0) ||
    (isArchiveActive && isNotMobile && rebuildedNews?.length > 0);

  const isAccountPages = isAccountPage || isManageAccountPage;
  const shouldNotShowFiltersManager = isAccountPages || isAboutUs || isArchiveActive || isErrorPage;
  const showScreenHeight =
    (isFavoriteActive && allFavourites && allFavourites.length === 0) ||
    (isReadActive && allReads && allReads.length === 0) ||
    (isArchiveActive && allArchive && allArchive.length === 0) ||
    isAccountPage;

  const showSuccessToast =
    statusMessage === 'Email sent successfully' ||
    statusMessage === 'User sign-in success' ||
    statusMessage === 'Sign-out success';
  console.log('statusMessage', statusMessage);
  return (
    <div
      className={`${
        showScreenHeight ? 'h-screen' : 'h-full'
      } flex max-h-sectionSmall flex-col justify-between md:max-h-sectionMedium lg:max-h-sectionLarge`}
    >
      {!isErrorPage && <Header />}
      <main className='h-full'>
        {isHomeActive && <Hero />}
        <section
          className={`h-full w-screen bg-whiteBase transition-colors duration-500 dark:bg-darkBackground ${
            isArchiveActive || isFavoriteActive || isReadActive
              ? 'pt-10 md:pt-12 lg:pt-[60px]'
              : 'pt-6 md:pt-7'
          } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {isAuthenticated && !shouldNotShowFiltersManager ? <NewsFilterManager /> : null}
            {!isAuthenticated && !isNotMobile && !isErrorPage && (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            )}
            {isErrorPage && (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
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
                  icon='icon-triangle-up'
                  classIcon='rotate-180'
                />
              </>
            ) : null}
            <Outlet />
          </div>
        </section>
      </main>
      {!isErrorPage && <Footer />}
      {/* {showSuccessToast && <ToastSuccess variant='non-interactive' />} */}
      {showSuccessToast && <Toast variant='non-interactive' status='success' />}
    </div>
  );
};

export default Layout;
