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
  const { isNotMobile } = useWindowWidth();

  const { fetchCategoriesList, errorAPI } = useNewsAPI();
  const { isAuthenticated, statusMessage } = useAuthRedux();
  const { allFavourites, allArchive } = useDB();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

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

  const is429ErrorAPI = errorAPI?.toString().includes('429');

  const shouldShowPageScrollController =
    (isHomeActive && isNotMobile && rebuildedNews?.length > 0) ||
    (isArchiveActive && isNotMobile && rebuildedNews?.length > 0);

  const isAccountPages = isAccountPage || isManageAccountPage;
  const shouldNotShowFiltersManager =
    isAccountPages ||
    isAboutUs ||
    isArchiveActive ||
    isErrorPage ||
    (isHomeActive && is429ErrorAPI);

  const showSuccessToast =
    (statusMessage === 'Email sent successfully' ||
      statusMessage === 'Password has successfully changed' ||
      statusMessage === 'User sign-in success' ||
      statusMessage === 'Sign-out success' ||
      statusMessage.includes('linking')) &&
    statusMessage !== '';

  const screenShow =
    isAccountPages ||
    (isFavoriteActive && allFavourites?.length === 0) ||
    isReadActive ||
    (isArchiveActive && allArchive?.length === 0) // питання відкрите саме по сторінці Archive
      ? 'h-screen'
      : 'h-full';

  return (
    <div
      className={`flex max-h-sectionSmall
        flex-col justify-between md:max-h-sectionMedium lg:max-h-sectionLarge hg:max-h-sectionHuge ${screenShow}`}
    >
      {!isErrorPage && <Header />}
      <main>
        {isHomeActive && <Hero />}
        <section
          className={`w-full bg-whiteBase pb-[60px] transition-colors duration-500 dark:bg-darkBackground md:pb-[100px] lg:pb-[150px] ${
            isArchiveActive || isFavoriteActive || isReadActive || (isHomeActive && is429ErrorAPI)
              ? 'pt-10 md:pt-12 lg:pt-[60px]'
              : 'pt-6 md:pt-7 hg:pt-[60px]'
          }`}
        >
          <div className='container mx-auto px-4 hg:px-[65px]'>
            {!isNotMobile && !isErrorPage && (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            )}
            {isAuthenticated && !shouldNotShowFiltersManager ? <NewsFilterManager /> : null}
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
                  icon='triangle'
                />
                <PageScrollController
                  direction='down'
                  label='Scroll down'
                  position='bottom-12'
                  icon='triangle'
                  classIcon='rotate-180'
                />
              </>
            ) : null}
            <Outlet />
          </div>
        </section>
      </main>
      {!isErrorPage && <Footer />}
      {showSuccessToast ? <Toast variant='non-interactive' status='success' /> : null}
    </div>
  );
};

export default Layout;
